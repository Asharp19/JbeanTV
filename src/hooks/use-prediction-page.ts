/**
 * Custom hook for Prediction Page logic
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { gsap } from "gsap";
import {
  fetchPriceData,
  PriceData,
} from "@/lib/services/price-service";
import { fetchAgentMessages } from "@/lib/services/agent-message-service";

const STATS_DELAY = 2000; // 2 seconds

export function usePredictionPage(initialPair: string) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [selectedPair, setSelectedPair] = useState(initialPair);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [priceData, setPriceData] = useState<{
    [symbol: string]: PriceData;
  }>({});
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [pairPredictionCounts, setPairPredictionCounts] = useState<{
    [symbol: string]: number;
  }>({});
  const [predictionCountsLoading, setPredictionCountsLoading] = useState<{
    [symbol: string]: boolean;
  }>({});
  const [readyToRender, setReadyToRender] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [predictionToEdit, setPredictionToEdit] = useState<any | null>(null);

  const fetchingPairRef = useRef<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch price for a pair
  const fetchPriceForPair = useCallback(async (symbol: string) => {
    if (
      fetchingPairRef.current === symbol ||
      (priceData[symbol] && priceData[symbol].currentPrice)
    ) {
      return;
    }

    fetchingPairRef.current = symbol;

    setPriceData((prev) => ({
      ...prev,
      [symbol]: {
        ...prev[symbol],
        isLoading: true,
        error: undefined,
      },
    }));

    try {
      const data = await fetchPriceData(symbol);

      setPriceData((prev) => ({
        ...prev,
        [symbol]: {
          ...data,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      setPriceData((prev) => ({
        ...prev,
        [symbol]: {
          ...prev[symbol],
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch price data",
        },
      }));
    } finally {
      fetchingPairRef.current = null;
    }
  }, [priceData]);

  // Fetch prediction counts
  const fetchPredictionCounts = useCallback(async (symbol: string) => {
    try {
      setPredictionCountsLoading((prev) => ({
        ...prev,
        [symbol]: true,
      }));

      setReadyToRender(false);

      const response = await fetch(`/api/user-predictions/${symbol}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prediction counts");
      }

      const result = await response.json();
      if (result.success && result.data) {
        const totalPredictions = result.data.totalPredictions ?? 0;
        setPairPredictionCounts((prev) => ({
          ...prev,
          [symbol]: totalPredictions,
        }));

        setTimeout(() => {
          setReadyToRender(true);
          setPredictionCountsLoading((prev) => ({
            ...prev,
            [symbol]: false,
          }));
        }, STATS_DELAY);
      }
    } catch (error) {
      console.error(`Error fetching prediction counts for ${symbol}:`, error);
      setTimeout(() => {
        setPredictionCountsLoading((prev) => ({
          ...prev,
          [symbol]: false,
        }));
      }, STATS_DELAY);
    }
  }, []);

  // Check user prediction status
  const checkUserPrediction = useCallback(async (symbol: string) => {
    if (status !== "authenticated" || !session?.user?.email) {
      setPredictionSubmitted(false);
      return;
    }

    try {
      const userId = encodeURIComponent(session.user.email);
      const response = await fetch(
        `/api/user-predictions/${symbol}/${userId}?checkSubmission=true`
      );

      if (!response.ok) {
        throw new Error("Failed to check prediction status");
      }

      const data = await response.json();
      setPredictionSubmitted(data.hasSubmitted);
    } catch (error) {
      console.error("Error checking user prediction:", error);
      setPredictionSubmitted(false);
    }
  }, [status, session?.user?.email]);

  // Fetch target date
  const fetchTargetDate = useCallback(async (symbol: string) => {
    try {
      const data = await fetchAgentMessages(symbol);
      if (data.targetDate) {
        setTargetDate(data.targetDate);
      }
    } catch (error) {
      console.error("Error fetching agent messages:", error);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setTargetDate(tomorrow.toISOString());
    }
  }, []);

  // Handle tab change
  const handleTabChange = useCallback(
    async (symbol: string, availablePairs: any[], pairPredictionCounts: any) => {
      if (symbol === selectedPair || isTransitioning) return;

      setIsTransitioning(true);
      setReadyToRender(false);

      // Animate out
      await gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.inOut",
      });

      setSelectedPair(symbol);
      router.push(`/predictions/${symbol}`, { scroll: false });

      // Animate in
      await gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      setIsTransitioning(false);
    },
    [selectedPair, isTransitioning, router]
  );

  // Handle prediction success
  const handlePredictionSuccess = useCallback(
    (isEditing = false) => {
      if (!isEditing) {
        setPairPredictionCounts((prev) => ({
          ...prev,
          [selectedPair]: (prev[selectedPair] || 0) + 1,
        }));
      }

      setPredictionSubmitted(true);
    },
    [selectedPair]
  );

  // Effects
  useEffect(() => {
    fetchPriceForPair(selectedPair);
  }, [selectedPair, fetchPriceForPair]);

  useEffect(() => {
    fetchPredictionCounts(selectedPair);
  }, [selectedPair, fetchPredictionCounts]);

  useEffect(() => {
    checkUserPrediction(selectedPair);
  }, [selectedPair, checkUserPrediction]);

  useEffect(() => {
    fetchTargetDate(selectedPair);
  }, [selectedPair, fetchTargetDate]);

  return {
    selectedPair,
    isTransitioning,
    predictionSubmitted,
    priceData,
    targetDate,
    pairPredictionCounts,
    predictionCountsLoading,
    readyToRender,
    editMode,
    predictionToEdit,
    contentRef,
    setSelectedPair,
    setPredictionSubmitted,
    setEditMode,
    setPredictionToEdit,
    setPriceData,
    handleTabChange,
    handlePredictionSuccess,
  };
}

