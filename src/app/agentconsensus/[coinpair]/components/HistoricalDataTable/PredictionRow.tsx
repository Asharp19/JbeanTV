import React from "react";
import { HistoricalPrediction } from "./index";

interface PredictionRowProps {
  prediction: HistoricalPrediction;
  tabType: "ai" | "coordinator" | "crowd";
  showAllActualData?: boolean;
}

export const PredictionRow: React.FC<PredictionRowProps> = ({
  prediction,
  tabType,
  showAllActualData = false,
}) => {
  // Get status color
  const getStatusColor = () => {
    switch (prediction.status) {
      case "Correct":
        return "bg-green-900/70 text-green-400";
      case "Incorrect":
        return "bg-red-900/70 text-red-400";
      default:
        return "bg-gray-800/50 text-gray-400";
    }
  };

  const getRowClasses = () => {
    const baseClasses =
      "text-xs border-b border-gray-800/30 transition-colors h-14";

    if (tabType === "ai") {
      return `${baseClasses} hover:bg-purple-900/10`;
    } else if (tabType === "coordinator") {
      return `${baseClasses} hover:bg-blue-900/10`;
    } else {
      return `${baseClasses} hover:bg-teal-900/10`;
    }
  };

  const renderActualPrice = (price?: string) => {
    if (!price) {
      return <span className="text-gray-600">$0.00</span>;
    }

    if (tabType === "ai") {
      return <span className="text-purple-400">{price}</span>;
    } else if (tabType === "coordinator") {
      return <span className="text-blue-400">{price}</span>;
    } else {
      return <span className="text-teal-400">{price}</span>;
    }
  };

  const renderAccuracyPercent = (accuracyPercent?: string | null) => {
    if (!accuracyPercent) {
      return <span className="text-gray-600">-</span>;
    }

    const percent = parseFloat(accuracyPercent);
    const absPercent = Math.abs(percent);

    // Color coding based on accuracy
    let colorClass = "text-gray-400";
    if (absPercent <= 5) {
      colorClass = "text-green-400"; // Very good accuracy
    } else if (absPercent <= 10) {
      colorClass = "text-yellow-400"; // Decent accuracy
    } else {
      colorClass = "text-red-400"; // Poor accuracy
    }

    return (
      <span className={`${colorClass} font-mono`}>{accuracyPercent}%</span>
    );
  };

  return (
    <tr className={getRowClasses()}>
      <td className="px-4 text-gray-400 whitespace-nowrap">
        {prediction.date}
      </td>
      <td className="px-4 text-gray-400 whitespace-nowrap">
        {prediction.target}
      </td>
      <td className="px-4 text-right font-mono text-gray-400">
        {prediction.predictedHigh}
      </td>
      <td className="px-4 text-right font-mono text-gray-400">
        {prediction.predictedLow}
      </td>
      <td className="px-4 text-right font-mono font-medium text-white">
        {prediction.predictedPrice}
      </td>

      {showAllActualData ? (
        <>
          <td className="px-4 text-right font-mono">
            {renderActualPrice(prediction.actualHigh)}
          </td>
          <td className="px-4 text-right font-mono">
            {renderActualPrice(prediction.actualLow)}
          </td>
          <td className="px-4 text-right font-mono">
            {renderActualPrice(prediction.actualClose)}
          </td>
          <td className="px-4 text-right font-mono">
            {renderAccuracyPercent((prediction as any).accuracyPercent)}
          </td>
        </>
      ) : (
        <>
          <td className="px-4 text-right font-mono">
            {renderActualPrice(prediction.actualClose)}
          </td>
          <td className="px-4 text-right font-mono">
            {renderAccuracyPercent((prediction as any).accuracyPercent)}
          </td>
        </>
      )}
    </tr>
  );
};
