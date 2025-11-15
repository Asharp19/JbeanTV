import React from "react";
import { HistoricalPrediction } from "./index";

interface PredictionEntryProps {
  prediction: HistoricalPrediction;
  tabType: "ai" | "coordinator" | "crowd";
}

export const PredictionEntry: React.FC<PredictionEntryProps> = ({
  prediction,
  tabType,
}) => {
  // Choose color based on tab type
  const getColorClass = () => {
    switch (tabType) {
      case "ai":
        return "from-purple-500/20 to-purple-500/5";
      case "coordinator":
        return "from-blue-500/20 to-blue-500/5";
      case "crowd":
        return "from-emerald-500/20 to-emerald-500/5";
      default:
        return "from-purple-500/20 to-purple-500/5";
    }
  };

  // Choose border color based on status
  const getStatusColor = () => {
    switch (prediction.status) {
      case "Correct":
        return "border-success-foreground";
      case "Incorrect":
        return "border-error-foreground";
      default:
        return "border-content-quaternary";
    }
  };

  return (
    <div
      className={`rounded-xl border ${getStatusColor()} bg-gradient-to-br ${getColorClass()} p-4 relative overflow-hidden`}
    >
      <div className="flex justify-between mb-2 text-xs text-content-tertiary">
        <div>
          <span className="font-medium">DATE</span>
          <p className="text-content-primary font-medium mt-1">
            {prediction.date}
          </p>
        </div>
        <div className="text-right">
          <span className="font-medium">TARGET</span>
          <p className="text-content-primary font-medium mt-1">
            {prediction.target}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-background-tertiary/40 rounded-lg p-2">
          <div className="text-2xs text-content-tertiary">PREDICTED HIGH</div>
          <div className="text-sm font-medium text-content-primary">
            {prediction.predictedHigh}
          </div>
        </div>
        <div className="bg-background-tertiary/40 rounded-lg p-2">
          <div className="text-2xs text-content-tertiary">PREDICTED LOW</div>
          <div className="text-sm font-medium text-content-primary">
            {prediction.predictedLow}
          </div>
        </div>
        <div className="bg-background-tertiary/40 rounded-lg p-2">
          <div className="text-2xs text-content-tertiary">PREDICTED CLOSE</div>
          <div className="text-sm font-medium text-content-primary">
            {prediction.predictedClose}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs text-content-tertiary">PREDICTED PRICE</div>
          <div className="text-lg font-bold text-content-primary">
            {prediction.predictedPrice}
          </div>
        </div>
      </div>
    </div>
  );
};
