/**
 * Component for displaying a list of predictions
 */
"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";
import { PredictionData } from "./types";
import { formatDateTime } from "./utils";

/**
 * Props for PredictionList component
 */
export interface PredictionListProps {
  /** List of predictions to display */
  predictions: PredictionData[];
  /** Current market price for calculation of accuracy */
  currentPrice: number;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Error message to display */
  error?: string | null;
  /** Additional class names */
  className?: string;
}

/**
 * Calculates accuracy percentage between predicted and actual prices
 */
function calculateAccuracy(
  predictedPrice: number,
  currentPrice: number
): number {
  if (!currentPrice || !predictedPrice) return 0;
  const priceDifference = Math.abs(predictedPrice - currentPrice);
  return Math.max(0, 100 - (priceDifference / predictedPrice) * 100);
}

/**
 * Component that displays a list of user's predictions
 */
export const PredictionList: FC<PredictionListProps> = ({
  predictions,
  currentPrice,
  isLoading = false,
  error = null,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-start"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 text-red-200 p-4 rounded-lg">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="bg-slate-800/40 p-8 rounded-lg text-center">
        <p className="text-slate-100/70">No predictions made yet.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {predictions.map((prediction, index) => (
        <Card
          key={index}
          className="p-4 bg-background-secondary/40 hover:bg-background-secondary/60 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-slate-100">Prediction</h4>
                <span className="text-xs bg-slate-700/60 px-2 py-0.5 rounded text-slate-300">
                  #{index + 1}
                </span>
              </div>
              <p className="text-sm text-slate-100/70 mb-2">
                Made on: {formatDateTime(prediction.timestamp)}
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase text-slate-100/50">High</p>
                  <p className="font-medium text-slate-100">
                    ${prediction.high.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-100/50">Low</p>
                  <p className="font-medium text-slate-100">
                    ${prediction.low.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-100/50">Close</p>
                  <p className="font-medium text-slate-100">
                    ${prediction.close.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/30 px-4 py-2 rounded-lg">
              <p className="text-xs text-slate-100/70 mb-1">
                Current Accuracy (Close):
              </p>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-green-500"
                    style={{
                      width: `${Math.min(
                        100,
                        calculateAccuracy(prediction.close, currentPrice)
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-100">
                  {calculateAccuracy(prediction.close, currentPrice).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
