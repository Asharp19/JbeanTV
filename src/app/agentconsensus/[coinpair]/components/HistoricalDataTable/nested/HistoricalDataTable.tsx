import React, { useMemo } from "react";
import { format } from "date-fns";
import { AgentPrediction } from "../../types";
import { useBinanceHistoricalData } from "@/hooks/use-binance-historical-data";

interface HistoricalDataTableProps {
  predictions: AgentPrediction[];
  loading?: boolean;
  symbol: string;
}

export const HistoricalDataTable: React.FC<HistoricalDataTableProps> = ({
  predictions,
  loading = false,
  symbol,
}) => {
  // Deduplicate predictions by targetDate (keep most recent predictionDate)
  const dedupedPredictions = useMemo(() => {
    console.log(
      "Raw predictions before deduplication:",
      predictions.length,
      predictions
    );

    // First, filter out any predictions without targetDate
    const validPredictions = predictions.filter((pred) => pred.targetDate);
    console.log("Valid predictions with targetDate:", validPredictions.length);

    // Create a more robust deduplication map
    const dateMap = new Map<string, any>();

    validPredictions.forEach((pred, index) => {
      try {
        // Parse the target date and normalize to YYYY-MM-DD
        if (!pred.targetDate) return; // Additional safety check

        const targetDate = new Date(pred.targetDate);
        const normalizedDate = targetDate.toISOString().split("T")[0];

        console.log(
          `Prediction ${index}: targetDate=${pred.targetDate}, normalized=${normalizedDate}, predictionDate=${pred.predictionDate}`
        );

        if (!dateMap.has(normalizedDate)) {
          dateMap.set(normalizedDate, pred);
          console.log(`Added first prediction for date ${normalizedDate}`);
        } else {
          const existing = dateMap.get(normalizedDate);

          // Compare prediction dates - keep the most recent one
          const currentPredDate = pred.predictionDate
            ? new Date(pred.predictionDate)
            : new Date(0);
          const existingPredDate = existing.predictionDate
            ? new Date(existing.predictionDate)
            : new Date(0);

          if (currentPredDate > existingPredDate) {
            dateMap.set(normalizedDate, pred);
            console.log(
              `Replaced prediction for date ${normalizedDate} with more recent one`
            );
          } else {
            console.log(`Kept existing prediction for date ${normalizedDate}`);
          }
        }
      } catch (error) {
        console.error("Error processing prediction:", pred, error);
      }
    });

    const result = Array.from(dateMap.values()).sort(
      (a, b) =>
        new Date(b.targetDate).getTime() - new Date(a.targetDate).getTime()
    );

    console.log("Final deduplicated predictions:", result.length, result);
    return result;
  }, [predictions]);

  // Extract target dates for fetching actual data
  const targetDates = useMemo(
    () =>
      dedupedPredictions
        .filter((p) => p.targetDate)
        .map((p) => p.targetDate as string)
        .filter((date) => new Date(date) <= new Date()),
    [dedupedPredictions]
  );

  // Fetch actual price data from Binance
  const { priceData: actualPriceData, loading: priceDataLoading } =
    useBinanceHistoricalData(symbol, targetDates);

  const formatPrice = (price: number) =>
    price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getRemainingTime = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return "Awaiting results";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const getAccuracyClass = (percentDiff: number | undefined) => {
    if (percentDiff === undefined) return "text-gray-400";
    if (Math.abs(percentDiff) < 1) return "text-green-400";
    if (Math.abs(percentDiff) < 3) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  if (!dedupedPredictions.length) {
    return (
      <p className="text-content-secondary text-center py-6">
        No historical predictions available yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {dedupedPredictions.map((prediction, index) => {
        // Skip predictions without required data
        if (
          !prediction.targetDate ||
          !prediction.predictionDate ||
          !prediction.prediction
        ) {
          return null;
        }

        // Get actual price data for this prediction
        const actualData = prediction.targetDate
          ? actualPriceData[prediction.targetDate]
          : undefined;
        const isPending = new Date(prediction.targetDate) > new Date();

        // Calculate percent difference based on actual close if available
        const percentDifference =
          !isPending && actualData && prediction.prediction
            ? ((actualData.close - prediction.prediction.close) /
                prediction.prediction.close) *
              100
            : prediction.percentDifference;

        return (
          <div
            key={`${prediction.agentName || "unknown"}-${index}`}
            className="bg-surface-primary/10 rounded-md overflow-hidden border border-surface-primary/30 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="space-y-1">
                <div className="text-xs uppercase text-content-secondary">
                  DATE
                </div>
                <div className="text-sm">
                  {format(new Date(prediction.predictionDate), "MMM d, yyyy")}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase text-content-secondary">
                  TARGET
                </div>
                <div className="text-sm">
                  {!isPending ? (
                    format(new Date(prediction.targetDate), "MMM d, yyyy")
                  ) : (
                    <span className="text-accent-primary">
                      {getRemainingTime(prediction.targetDate)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-surface-primary/30">
              <div className="p-4 font-mono flex flex-col justify-center bg-surface-primary/5">
                <div className="text-xs uppercase text-content-secondary mb-1">
                  Predicted High
                </div>
                <div className="font-medium">
                  ${formatPrice(prediction.prediction.high)}
                </div>
              </div>

              <div className="p-4 font-mono flex flex-col justify-center bg-surface-primary/5 border-l border-r border-surface-primary/30">
                <div className="text-xs uppercase text-content-secondary mb-1">
                  Predicted Low
                </div>
                <div className="font-medium">
                  ${formatPrice(prediction.prediction.low)}
                </div>
              </div>

              <div className="p-4 font-mono flex flex-col justify-center bg-surface-primary/5">
                <div className="text-xs uppercase text-content-secondary mb-1">
                  Predicted Close
                </div>
                <div className="font-medium">
                  ${formatPrice(prediction.prediction.close)}
                </div>
              </div>
            </div>

            {/* Actual price data section */}
            {!isPending && actualData ? (
              <div className="grid grid-cols-3 border-t border-surface-primary/30 bg-surface-glass/10">
                <div className="p-4 font-mono flex flex-col justify-center">
                  <div className="text-xs uppercase text-content-secondary mb-1">
                    Actual High
                  </div>
                  <div className="font-medium text-blue-300">
                    ${formatPrice(actualData.high)}
                  </div>
                </div>

                <div className="p-4 font-mono flex flex-col justify-center border-l border-r border-surface-primary/30">
                  <div className="text-xs uppercase text-content-secondary mb-1">
                    Actual Low
                  </div>
                  <div className="font-medium text-blue-300">
                    ${formatPrice(actualData.low)}
                  </div>
                </div>

                <div className="p-4 font-mono flex flex-col justify-center">
                  <div className="text-xs uppercase text-content-secondary mb-1">
                    Actual Close
                  </div>
                  <div className="font-medium text-blue-300">
                    ${formatPrice(actualData.close)}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-2 bg-surface-glass/5 border-t border-surface-primary/30">
              <div className="p-4 font-mono flex justify-center items-center bg-surface-primary/5">
                <div className="flex flex-col items-center">
                  <div className="text-xs uppercase text-content-secondary mb-1">
                    {!isPending ? "Actual vs Predicted" : "Predicted Price"}
                  </div>
                  <div className="text-2xl font-medium">
                    {!isPending && actualData ? (
                      <div className="flex items-center">
                        <span className="mr-2">
                          ${formatPrice(actualData.close)}
                        </span>
                        <span className="text-gray-400 text-lg">/</span>
                        <span className="ml-2 text-gray-400">
                          ${formatPrice(prediction.prediction.close)}
                        </span>
                      </div>
                    ) : (
                      <>${formatPrice(prediction.prediction.close)}</>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-primary/10 border-l border-surface-primary/30 flex justify-center items-center">
                {percentDifference !== undefined ? (
                  <div className="flex flex-col items-center">
                    <div className="text-xs uppercase text-content-secondary mb-1">
                      Accuracy
                    </div>
                    <div
                      className={`text-2xl font-medium ${getAccuracyClass(
                        percentDifference
                      )}`}
                    >
                      {percentDifference > 0 ? "+" : ""}
                      {percentDifference.toFixed(2)}%
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="text-xs uppercase text-content-secondary mb-1">
                      Status
                    </div>
                    <div className="text-2xl font-medium text-gray-400">
                      Pending
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
