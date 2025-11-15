import { useState, useCallback, useEffect } from "react";

export function usePredictionCounts(selectedPair: string) {
  const [pairPredictionCounts, setPairPredictionCounts] = useState<{
    [symbol: string]: number;
  }>({});
  const [predictionCountsLoading, setPredictionCountsLoading] = useState<{
    [symbol: string]: boolean;
  }>({});
  const [readyToRender, setReadyToRender] = useState(true);

  const fetchPredictionCounts = useCallback(async (symbol: string) => {
    try {
      // Set loading state to true for this symbol
      setPredictionCountsLoading((prev) => ({
        ...prev,
        [symbol]: true,
      }));

      setReadyToRender(false); // Reset render state

      const response = await fetch(`/api/user-predictions/${symbol}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prediction counts");
      }

      const result = await response.json();
      console.log("Prediction counts response:", result);
      if (result.success && result.data) {
        const totalPredictions = result.data.totalPredictions ?? 0;
        setPairPredictionCounts((prev) => ({
          ...prev,
          [symbol]: totalPredictions,
        }));

        // Add a 2-second delay before finishing the loading state
        setTimeout(() => {
          setReadyToRender(true);
          setPredictionCountsLoading((prev) => ({
            ...prev,
            [symbol]: false,
          }));
        }, 2000);

        return totalPredictions;
      }
    } catch (error) {
      console.error(`Error fetching prediction counts for ${symbol}:`, error);
      // Still set loading to false after error, with delay
      setTimeout(() => {
        setReadyToRender(true);
        setPredictionCountsLoading((prev) => ({
          ...prev,
          [symbol]: false,
        }));
      }, 2000);
      return 0;
    }
  }, []);

  useEffect(() => {
    fetchPredictionCounts(selectedPair);
  }, [selectedPair, fetchPredictionCounts]);

  return {
    pairPredictionCounts,
    setPairPredictionCounts,
    predictionCountsLoading,
    readyToRender,
    fetchPredictionCounts,
  };
}

