import { memo, RefObject, useState, useEffect, useCallback } from "react";
import { CarouselItem } from "./CarouselItem";

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

interface CarouselContentProps {
  carouselRef: RefObject<HTMLDivElement>;
  cardsRef: RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cardWidth: number;
  gap: number;
  isLoading: boolean;
  predictions: PredictionData[];
}

export const CarouselContent = memo(function CarouselContent({
  carouselRef,
  cardsRef,
  onMouseEnter,
  onMouseLeave,
  cardWidth,
  gap,
  predictions,
  isLoading: externalLoading,
}: CarouselContentProps) {
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Fetch prediction data (one-time operation)

  // Fetch individual prediction counts - run only when the data has been initialized
  useEffect(() => {
    // Only proceed if we have predictions and we've already fetched initial data

    // For each prediction, fetch its count
    predictions.forEach((prediction, index) => {
      const fetchPredictionCount = async () => {
        console.log("this component is rendering");
        try {
          // Keep the exact same API endpoint
          const response = await fetch(
            `/api/user-predictions/${prediction.symbol}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch predictions for ${prediction.symbol}`
            );
          }

          const result = await response.json();
          if (result.success && result.data) {
            // Create a new object to update this prediction
            predictions[index] = {
              ...prediction,
              predictions: result.data.totalPredictions || 0,
            };
          }
        } catch (error) {
          console.error(
            `Error fetching predictions for ${prediction.symbol}:`,
            error
          );
        }
      };

      // Start the fetch for this prediction
      fetchPredictionCount();
    });
  }, [predictions]); // Only depend on these values to prevent re-runs

  // Combine external loading state with internal loading state

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={cardsRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
        style={{
          width: `${predictions.length * (cardWidth + gap)}px`,
        }}
      >
        {predictions?.map((prediction) => (
          <CarouselItem
            key={prediction.id}
            prediction={prediction}
            width={cardWidth}
            isLoading={externalLoading}
          />
        ))}
      </div>
    </div>
  );
});
