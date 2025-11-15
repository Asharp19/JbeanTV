import { memo } from "react";
import { PredictionCard } from "@/app/predictions/[coinpair]/components/PredictionCard";
import { PredictionSkeleton } from "./PredictionSkeleton";

interface PredictionData {
  id: number;
  symbol: string;
  predictions: number;
  color: string;
  poolDistribution: {
    exactPrediction: number;
    within025Percent: number;
    within05Percent: number;
    within1Percent: number;
    within2Percent: number;
    pool90: number;
  };
  targetDate: string;
  rewardPool: string;
  requiredStreak: number;
}

interface CarouselItemProps {
  prediction: PredictionData;
  width: number;
  isLoading: boolean;
}

export const CarouselItem = memo(function CarouselItem({
  prediction,
  width,
  isLoading,
}: CarouselItemProps) {
  return (
    <div className="flex-shrink-0" style={{ width }}>
      {isLoading ? (
        <PredictionSkeleton width={width} />
      ) : (
        <PredictionCard prediction={prediction} width={width} />
      )}
    </div>
  );
});
