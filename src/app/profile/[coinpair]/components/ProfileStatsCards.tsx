/**
 * Stats cards component for the user profile
 */
"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";

/**
 * Props for ProfileStatsCards component
 */
export interface ProfileStatsCardsProps {
  /** Number of current round predictions */
  currentPredictionsCount: number;
  /** Number of next round predictions */
  nextPredictionsCount: number;
  /** Current market price */
  currentPrice: number;
  /** Additional class names */
  className?: string;
}

/**
 * Displays statistics cards for the profile page
 */
export const ProfileStatsCards: FC<ProfileStatsCardsProps> = ({
  currentPredictionsCount,
  nextPredictionsCount,
  currentPrice,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${className}`}>
      <Card className="p-4 bg-background-secondary/40">
        <p className="text-sm text-slate-100/70">Current Round Predictions</p>
        <p className="text-2xl font-bold text-slate-100">
          {currentPredictionsCount}
        </p>
      </Card>
      <Card className="p-4 bg-background-secondary/40">
        <p className="text-sm text-slate-100/70">Next Round Predictions</p>
        <p className="text-2xl font-bold text-slate-100">
          {nextPredictionsCount}
        </p>
      </Card>
      <Card className="p-4 bg-background-secondary/40">
        <p className="text-sm text-slate-100/70">Current Market Price</p>
        <p className="text-2xl font-bold text-slate-100">
          ${currentPrice.toLocaleString()}
        </p>
      </Card>
    </div>
  );
};
