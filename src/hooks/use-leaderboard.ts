import { useMemo, useState, useEffect, useRef } from "react";
import { useTickerContext } from "@/contexts/TickerContext";
import type { LeaderboardEntry } from "@/types/predictions";

// Threshold for significant price changes (in percentage)
const SIGNIFICANT_CHANGE_THRESHOLD = 0.5; // 0.5%

// Throttle time for WebSocket data processing (in milliseconds)
const THROTTLE_TIME = 1000; // 1 second

// Minimum time to wait for initial price data (in milliseconds)
const INITIAL_PRICE_WAIT = 2000; // 2 seconds

export function useLeaderboard() {
  const {
    allTickersData,
    errors: tickerErrors,
    isAllConnected,
    addPair,
  } = useTickerContext();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPriceData, setHasPriceData] = useState(false);
  const previousPricesRef = useRef<Record<string, number>>({});
  const lastProcessTimeRef = useRef<number>(0);
  const [processedTickerData, setProcessedTickerData] = useState<
    typeof allTickersData
  >({});
  const addedPairsRef = useRef<Set<string>>(new Set());
  const initialLoadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Throttle WebSocket data processing with debounce
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastProcess = now - lastProcessTimeRef.current;
    
    if (timeSinceLastProcess > THROTTLE_TIME) {
      setProcessedTickerData(allTickersData);
      lastProcessTimeRef.current = now;

      // Check if we have any price data
      const hasAnyPrices = Object.values(allTickersData).some(
        (data) => data && typeof data.price === "number" && data.price > 0
      );
      setHasPriceData(hasAnyPrices);
    } else {
      // Debounce - schedule update for later
      const timeoutId = setTimeout(() => {
        setProcessedTickerData(allTickersData);
        lastProcessTimeRef.current = Date.now();
        
        const hasAnyPrices = Object.values(allTickersData).some(
          (data) => data && typeof data.price === "number" && data.price > 0
        );
        setHasPriceData(hasAnyPrices);
      }, THROTTLE_TIME - timeSinceLastProcess);
      
      return () => clearTimeout(timeoutId);
    }
  }, [allTickersData]);

  // Fetch predictions from MongoDB
  useEffect(() => {
    const abortController = new AbortController();

    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/leaderboard", {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.predictions || !Array.isArray(data.predictions)) {
          throw new Error("Invalid predictions data received from API");
        }

        setPredictions(data.predictions);
        setError(null);

        // Start a timer for minimum loading time
        initialLoadTimerRef.current = setTimeout(() => {
          if (hasPriceData) {
            setLoading(false);
          }
        }, INITIAL_PRICE_WAIT);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Leaderboard fetch aborted");
        } else {
          console.error("Failed to fetch predictions:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch prediction data"
          );
          setLoading(false);
        }
      }
    };

    fetchPredictions();

    return () => {
      abortController.abort();
      if (initialLoadTimerRef.current) {
        clearTimeout(initialLoadTimerRef.current);
      }
    };
  }, []);

  // Update loading state when price data arrives
  useEffect(() => {
    if (hasPriceData && predictions.length > 0 && loading) {
      // Only remove loading state if the minimum wait time has passed
      if (initialLoadTimerRef.current === null) {
        setLoading(false);
      }
    }
  }, [hasPriceData, predictions, loading]);

  // Get unique pairs from the predictions
  const availablePairs = useMemo(() => {
    const pairs = new Set(predictions.map((prediction) => prediction.pair));
    return Array.from(pairs).sort();
  }, [predictions]);

  // Add pairs to ticker context
  useEffect(() => {
    if (predictions.length > 0 && addPair) {
      availablePairs.forEach((pair) => {
        const formattedPair = pair?.replace(/USD$/, "/USDT");
        if (!addedPairsRef.current.has(formattedPair)) {
          addPair(formattedPair);
          addedPairsRef.current.add(formattedPair);
        }
      });
    }
  }, [predictions, addPair, availablePairs]);

  // Calculate leaderboard entries with real-time price data from WebSocket
  const leaderboardEntries = useMemo(() => {
    if (!predictions.length || !hasPriceData) {
      return [];
    }

    const currentPrices: Record<string, number> = {};
    const entries = predictions
      .map((prediction): LeaderboardEntry => {
        const pairSymbol = prediction?.pair?.replace(/USD$/, "/USDT");
        const tickerData = processedTickerData[pairSymbol];
        const currentPrice = tickerData?.price || 0;
        currentPrices[pairSymbol] = currentPrice;

        const priceDifference = Math.abs(
          prediction.predictedPrice - currentPrice
        );
        const accuracy = Math.max(
          0,
          100 - (priceDifference / prediction.predictedPrice) * 100
        );

        return {
          id: prediction._id,
          walletAddress: prediction.walletAddress,
          walletType: prediction.walletType,
          pair: prediction.pair,
          predictedPrice: Number(prediction.predictedPrice),
          predictedAt: prediction.predictedAt,
          targetDate: prediction.targetDate,
          currentPrice,
          priceDifference,
          accuracy,
          rank: 0,
          status:
            new Date(prediction.targetDate) > new Date()
              ? "pending"
              : "completed",
        };
      })
      .sort((a, b) => b.accuracy - a.accuracy)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    if (isAllConnected) {
      previousPricesRef.current = { ...currentPrices };
    }

    return entries;
  }, [predictions, processedTickerData, isAllConnected, hasPriceData]);

  const usingFallbackData = !isAllConnected;
  const hasError =
    error || Object.values(tickerErrors).some((err) => err !== null);

  return {
    leaderboardEntries,
    loading: loading || (!hasPriceData && predictions.length > 0),
    error: hasError ? "Error fetching data" : null,
    availablePairs,
    usingFallbackData,
  };
}
