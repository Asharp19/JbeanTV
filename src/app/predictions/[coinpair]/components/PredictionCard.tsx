import { memo } from "react";
import { PredictionJars } from "./PredictionJars";
import { Label } from "./nested/Label";
import { StatsBox } from "./nested/StatsBox";
import { CardContainer } from "./nested/CardContainer";
import { CardContent } from "./nested/CardContent";

interface PredictionCardProps {
  prediction: {
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
  };
  width?: number;
}

export const PredictionCard = memo(function PredictionCard({
  prediction,
  width,
}: PredictionCardProps) {
  const poolDistributionItems = [
    { label: "Exact", value: prediction.poolDistribution.exactPrediction },
    { label: "0.25%", value: prediction.poolDistribution.within025Percent },
    { label: "0.5%", value: prediction.poolDistribution.within05Percent },
    { label: "1%", value: prediction.poolDistribution.within1Percent },
    { label: "2%", value: prediction.poolDistribution.within2Percent },
  ];

  const statsItems = [
    { label: "Total", value: prediction.predictions },
    { label: "Pool", value: prediction.rewardPool.replace("$ ", "$") },
    { label: "Required", value: `${prediction.requiredStreak}+` },
  ];

  const leftContent = (
    <div className="flex flex-col gap-2 sm:gap-3 h-full">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-content-primary truncate">
        {prediction.symbol}
      </h2>
      <PredictionJars
        pair={{
          symbol: prediction.symbol,
          predictions: prediction.predictions,
          color: prediction.color,
        }}
      />
    </div>
  );

  const rightContent = (
    <>
      <div className="flex flex-col gap-2 sm:gap-3 h-full">
        {/* Header */}
        <div className="flex  items-center justify-end">
          <span className="text-xs sm:text-sm text-content-secondary shrink-0">
            {prediction.predictions} predictions
          </span>
        </div>

        {/* Pool Distribution */}
        <StatsBox
          title="Pool Distribution"
          items={poolDistributionItems}
          variant="percentage"
          layout={{ type: "cols", count: 5 }}
        />

        {/* Stats Grid */}
        <StatsBox
          title="Statistics"
          items={statsItems}
          variant="default"
          layout={{ type: "rows", count: 3 }}
          className="flex-1"
        />

        {/* Target Date */}
        <StatsBox
          title="Target Date"
          items={[
            {
              label: "Date & Time",
              value: `${new Date(
                prediction.targetDate
              ).toLocaleDateString()} 12:00 pm`,
            },
          ]}
          variant="date"
          layout={{ type: "rows", count: 1 }}
        />
      </div>
    </>
  );

  return (
    <CardContainer width={width}>
      <CardContent left={leftContent} right={rightContent} />
    </CardContainer>
  );
});
