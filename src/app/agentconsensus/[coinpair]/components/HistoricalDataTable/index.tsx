import React, { useState, useMemo } from "react";
import { PredictionRow } from "./PredictionRow";
import { TabSelector } from "./TabSelector";
import { TableContainer } from "./TableContainer";
import { PredictionChart } from "./PredictionChart";
import { format } from "date-fns";
import "./styles.css";

export interface HistoricalPrediction {
  date: string;
  target: string;
  predictedHigh: string;
  predictedLow: string;
  predictedClose: string;
  predictedPrice: string;
  actualHigh?: string;
  actualLow?: string;
  actualClose?: string;
  status: "Pending" | "Correct" | "Incorrect";
  rawPredictedHigh?: number;
  rawPredictedLow?: number;
  rawPredictedClose?: number;
  rawActualHigh?: number;
  rawActualLow?: number;
  rawActualClose?: number;
  rawDate?: string;
  accuracyPercent: string | null;
}

// Support both new props and legacy AgentPrediction type
interface HistoricalDataTableProps {
  predictions: HistoricalPrediction[] | any[];
  activeTab?: "ai" | "coordinator" | "crowd";
  onTabChange?: (tab: "ai" | "coordinator" | "crowd") => void;
  loading?: boolean;
  symbol?: string;
}

export const HistoricalDataTable: React.FC<HistoricalDataTableProps> = ({
  predictions,
  activeTab,
  onTabChange,
  loading = false,
  symbol,
}) => {
  // Check if we're using the new format or the legacy format
  const isNewFormat = useMemo(() => {
    if (!predictions || predictions.length === 0) return true;

    // Check if first prediction has the new format properties
    const firstPrediction = predictions[0];
    return (
      typeof firstPrediction.predictedHigh !== "undefined" ||
      typeof firstPrediction.predictedLow !== "undefined" ||
      typeof firstPrediction.predictedClose !== "undefined"
    );
  }, [predictions]);

  // Convert legacy predictions to new format if needed
  const formattedPredictions = useMemo(() => {
    if (isNewFormat || !predictions || predictions.length === 0) {
      return predictions as HistoricalPrediction[];
    }

    // Convert from AgentPrediction to HistoricalPrediction
    const converted = predictions
      .map((p: any) => {
        // Skip predictions without required data
        if (!p.targetDate || !p.predictionDate || !p.prediction) {
          return null;
        }

        // Format price
        const formatPrice = (price: number) =>
          price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

        const isPending = new Date(p.targetDate) > new Date();

        // Check for actualPrice in the prediction object (as seen in the screenshot)
        const hasActualPrice =
          p.actualPrice && typeof p.actualPrice === "object";

        return {
          date: format(new Date(p.predictionDate), "MMM d, yyyy"),
          target: format(new Date(p.targetDate), "MMM d, yyyy"),
          predictedHigh: `$${formatPrice(p.prediction.high)}`,
          predictedLow: `$${formatPrice(p.prediction.low)}`,
          predictedClose: `$${formatPrice(p.prediction.close)}`,
          predictedPrice: `$${formatPrice(p.prediction.close)}`,
          // Add actual price data if available
          ...(hasActualPrice
            ? {
                actualHigh: `$${formatPrice(p.actualPrice.high || 0)}`,
                actualLow: `$${formatPrice(p.actualPrice.low || 0)}`,
                actualClose: `$${formatPrice(p.actualPrice.close || 0)}`,
              }
            : {}),
          status: isPending
            ? "Pending"
            : p.percentDifference !== undefined &&
              Math.abs(p.percentDifference) < 3
            ? "Correct"
            : "Incorrect",
          // Add raw values for charting
          rawPredictedHigh: p.prediction.high,
          rawPredictedLow: p.prediction.low,
          rawPredictedClose: p.prediction.close,
          rawActualHigh: hasActualPrice ? p.actualPrice.high : undefined,
          rawActualLow: hasActualPrice ? p.actualPrice.low : undefined,
          rawActualClose: hasActualPrice ? p.actualPrice.close : undefined,
          rawDate: p.targetDate,
          // Keep original data for deduplication
          originalPredictionDate: p.predictionDate,
          originalTargetDate: p.targetDate,
          // Calculate accuracy percentage
          accuracyPercent:
            hasActualPrice && p.prediction.close
              ? Math.abs(
                  ((p.actualPrice.close - p.prediction.close) /
                    p.prediction.close) *
                    100
                ).toFixed(2)
              : null,
        } as HistoricalPrediction & {
          originalPredictionDate: string;
          originalTargetDate: string;
          accuracyPercent: string | null;
        };
      })
      .filter(Boolean) as (HistoricalPrediction & {
      originalPredictionDate: string;
      originalTargetDate: string;
    })[];

    // Deduplicate by prediction date - keep the most recent prediction
    console.log("Before deduplication:", converted.length, converted);

    const dateMap = new Map<string, any>();

    converted.forEach((pred, index) => {
      try {
        // Normalize the prediction date to YYYY-MM-DD format
        const normalizedDate = new Date(pred.originalPredictionDate)
          .toISOString()
          .split("T")[0];

        console.log(
          `Prediction ${index}: predictionDate=${pred.originalPredictionDate}, normalized=${normalizedDate}, target=${pred.originalTargetDate}`
        );

        if (!dateMap.has(normalizedDate)) {
          dateMap.set(normalizedDate, pred);
          console.log(`Added first prediction for date ${normalizedDate}`);
        } else {
          const existing = dateMap.get(normalizedDate);

          // Compare prediction times - keep the most recent one within the same day
          const currentPredTime = new Date(pred.originalPredictionDate);
          const existingPredTime = new Date(existing.originalPredictionDate);

          if (currentPredTime > existingPredTime) {
            dateMap.set(normalizedDate, pred);
            console.log(
              `Replaced prediction for date ${normalizedDate} with more recent time`
            );
          } else {
            console.log(`Kept existing prediction for date ${normalizedDate}`);
          }
        }
      } catch (error) {
        console.error("Error processing prediction:", pred, error);
      }
    });

    const deduplicated = Array.from(dateMap.values())
      // Sort by prediction date in descending order (most recent first)
      .sort(
        (a, b) =>
          new Date(b.originalPredictionDate).getTime() -
          new Date(a.originalPredictionDate).getTime()
      );

    console.log("After deduplication:", deduplicated.length, deduplicated);

    return deduplicated;
  }, [predictions, isNewFormat]);

  // For compatibility with AgentHistoricalSection which doesn't provide these props
  const [internalActiveTab, setInternalActiveTab] = useState<
    "ai" | "coordinator" | "crowd"
  >("ai");
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabChange = (tab: "ai" | "coordinator" | "crowd") => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  if (!formattedPredictions || formattedPredictions.length === 0) {
    return (
      <p className="text-content-secondary text-center py-6">
        No historical predictions available yet.
      </p>
    );
  }

  // Prepare chart data - now with high, low, close values
  const chartData = formattedPredictions
    .filter((p) => p.rawDate && p.rawPredictedClose)
    .sort(
      (a, b) =>
        new Date(a.rawDate || "").getTime() -
        new Date(b.rawDate || "").getTime()
    )
    .map((p) => ({
      date: p.target,
      predictedHigh: p.rawPredictedHigh || 0,
      predictedLow: p.rawPredictedLow || 0,
      predictedClose: p.rawPredictedClose || 0,
      actualHigh: p.rawActualHigh,
      actualLow: p.rawActualLow,
      actualClose: p.rawActualClose,
      isPending: p.status === "Pending",
    }));

  // Render the correct header based on the active tab type
  const renderHeader = () => {
    if (currentActiveTab === "ai") {
      return (
        <div className="bg-#131a20-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-purple-500/20">
          Historical Predictions
        </div>
      );
    } else if (currentActiveTab === "coordinator") {
      return (
        <div className="bg-blue-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-blue-500/20">
          Historical Predictions
        </div>
      );
    } else {
      return (
        <div className="bg-teal-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-teal-500/20">
          Historical Predictions
        </div>
      );
    }
  };

  // Render the correct chart header based on the active tab type
  const renderChartHeader = () => {
    if (currentActiveTab === "ai") {
      return (
        <div className="bg-#101412-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-purple-500/20">
          Prediction vs Actual Prices
        </div>
      );
    } else if (currentActiveTab === "coordinator") {
      return (
        <div className="bg-blue-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-blue-500/20">
          Prediction vs Actual Prices
        </div>
      );
    } else {
      return (
        <div className="bg-teal-900/30 px-4 py-3 uppercase text-sm font-medium text-white border-b border-teal-500/20">
          Prediction vs Actual Prices
        </div>
      );
    }
  };

  // Render the correct container border based on the active tab type
  const renderTableContainer = () => {
    if (currentActiveTab === "ai") {
      return (
        <div className="bg-[#101011] rounded-lg border border-purple-500/20 h-full overflow-hidden">
          {renderHeader()}
          <div className="p-4 overflow-auto h-[calc(100%-3rem)] flex-grow">
            <table className="w-full h-full">
              <thead className="sticky top-0 bg-[#161618] z-10">
                <tr className="text-xs text-gray-400 uppercase">
                  <th className="py-2 px-2 text-left font-normal">Date</th>
                  <th className="py-2 px-2 text-left font-normal">Target</th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Accuracy %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/30">
                {formattedPredictions.map((prediction, index) => (
                  <PredictionRow
                    key={index}
                    prediction={prediction}
                    tabType={currentActiveTab}
                    showAllActualData={true}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (currentActiveTab === "coordinator") {
      return (
        <div className="bg-[#101011] rounded-lg border border-blue-500/20 h-full overflow-hidden">
          {renderHeader()}
          <div className="p-4 overflow-auto h-[calc(100%-3rem)] flex-grow">
            <table className="w-full h-full">
              <thead className="sticky top-0 bg-[#161618] z-10">
                <tr className="text-xs text-gray-400 uppercase">
                  <th className="py-2 px-2 text-left font-normal">Date</th>
                  <th className="py-2 px-2 text-left font-normal">Target</th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Accuracy %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/30">
                {formattedPredictions.map((prediction, index) => (
                  <PredictionRow
                    key={index}
                    prediction={prediction}
                    tabType={currentActiveTab}
                    showAllActualData={true}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-[#101011] rounded-lg border border-teal-500/20 h-full overflow-hidden">
          {renderHeader()}
          <div className="p-4 overflow-auto h-[calc(100%-3rem)] flex-grow">
            <table className="w-full h-full">
              <thead className="sticky top-0 bg-[#161618] z-10">
                <tr className="text-xs text-gray-400 uppercase">
                  <th className="py-2 px-2 text-left font-normal">Date</th>
                  <th className="py-2 px-2 text-left font-normal">Target</th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Pred. Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual High
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Low
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Actual Close
                  </th>
                  <th className="py-2 px-2 text-right font-normal">
                    Accuracy %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/30">
                {formattedPredictions.map((prediction, index) => (
                  <PredictionRow
                    key={index}
                    prediction={prediction}
                    tabType={currentActiveTab}
                    showAllActualData={true}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  // Render the correct chart container border based on the active tab type
  const renderChartContainer = () => {
    if (currentActiveTab === "ai") {
      return (
        <div className="w-full lg:w-[35%] h-full bg-[#0e0d11] rounded-lg border border-purple-500/20 flex flex-col overflow-hidden">
          {renderChartHeader()}
          <div className="p-4 flex-grow">
            <PredictionChart data={chartData} tabType={currentActiveTab} />
          </div>
        </div>
      );
    } else if (currentActiveTab === "coordinator") {
      return (
        <div className="w-full lg:w-[35%] h-full bg-[#1B1033] rounded-lg border border-blue-500/20 flex flex-col overflow-hidden">
          {renderChartHeader()}
          <div className="p-4 flex-grow">
            <PredictionChart data={chartData} tabType={currentActiveTab} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full lg:w-[35%] h-full bg-[#1B1033] rounded-lg border border-teal-500/20 flex flex-col overflow-hidden">
          {renderChartHeader()}
          <div className="p-4 flex-grow">
            <PredictionChart data={chartData} tabType={currentActiveTab} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {activeTab && onTabChange && (
        <div className="mb-4">
          <TabSelector
            activeTab={currentActiveTab}
            onTabChange={handleTabChange}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Predictions table - takes 65% of width */}
        <div className="w-full lg:w-[65%] h-full">{renderTableContainer()}</div>

        {/* Line chart - takes 35% of width */}
        {renderChartContainer()}
      </div>
    </div>
  );
};
