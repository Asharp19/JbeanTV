import { useState, useEffect, useRef } from "react";
import { fetchCurrentPrice, fetch24hrStats } from "@/lib/utils/price-api";

interface PriceData {
  currentPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  isLoading: boolean;
  error?: string;
}

export function usePriceData(selectedPair: string) {
  const [priceData, setPriceData] = useState<{
    [symbol: string]: PriceData;
  }>({});
  const [fetchingPair, setFetchingPair] = useState<string | null>(null);

  useEffect(() => {
    // Skip if we're already fetching this pair or if data exists
    if (
      fetchingPair === selectedPair ||
      (priceData[selectedPair] && priceData[selectedPair].currentPrice)
    ) {
      return;
    }

    const fetchPrice = async () => {
      // Mark as fetching
      setFetchingPair(selectedPair);

      // Set loading state
      setPriceData((prev) => ({
        ...prev,
        [selectedPair]: {
          ...prev[selectedPair],
          isLoading: true,
          error: undefined,
        },
      }));

      try {
        // Fetch current price
        const price = await fetchCurrentPrice(selectedPair);

        // Fetch 24hr stats
        const stats = await fetch24hrStats(selectedPair);

        // Update state with fetched data
        setPriceData((prev) => ({
          ...prev,
          [selectedPair]: {
            currentPrice: price,
            highPrice: stats.highPrice,
            lowPrice: stats.lowPrice,
            isLoading: false,
          },
        }));
      } catch (error) {
        console.error(`Error fetching price for ${selectedPair}:`, error);
        setPriceData((prev) => ({
          ...prev,
          [selectedPair]: {
            ...prev[selectedPair],
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch price data",
          },
        }));
      } finally {
        setFetchingPair(null);
      }
    };

    fetchPrice();
  }, [selectedPair, fetchingPair, priceData]);

  return {
    priceData,
    setPriceData,
    currentPrice: priceData[selectedPair]?.currentPrice || 0,
    isLoading: priceData[selectedPair]?.isLoading || false,
    hasError: !!priceData[selectedPair]?.error,
  };
}

