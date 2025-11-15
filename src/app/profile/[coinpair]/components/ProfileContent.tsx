/**
 * Main content component for the profile page
 */
"use client";

import { FC, useState, useEffect } from "react";
import { Session } from "next-auth";
import { PageTitle } from "@/components/ui/page-title";
import { useCryptoPrices } from "@/hooks/use-crypto-prices";
import { UserProfileCard } from "./UserProfileCard";
import { ProfileStatsCards } from "./ProfileStatsCards";
import { PairSelector } from "./PairSelector";
import { PredictionTabs } from "./PredictionTabs";
import { PredictionList } from "./PredictionList";
import { PredictionsDisplay } from "./PredictionsDisplay";
import {
  AVAILABLE_PAIRS,
  PredictionData,
  PredictionTab,
  UserPredictionsResponse,
} from "./types";
import { formatDisplayTargetDate } from "./utils";

/**
 * Props for ProfileContent component
 */
export interface ProfileContentProps {
  /** Current user session */
  session: Session;
  /** Current coin pair from route params */
  coinpair: string;
  /** Additional class names */
  className?: string;
}

/**
 * Main content component for the profile page
 */
export const ProfileContent: FC<ProfileContentProps> = ({
  session,
  coinpair,
  className = "",
}) => {
  const { prices } = useCryptoPrices();

  // State for user predictions and loading status
  const [currentPredictions, setCurrentPredictions] = useState<
    PredictionData[]
  >([]);
  const [nextPredictions, setNextPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<PredictionTab>("next");
  const [targetDate, setTargetDate] = useState<string | null>(null);

  // Fetch user predictions using the API route
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!session?.user?.email) return;

      try {
        setIsLoading(true);
        console.log(`Fetching predictions for user: ${session.user.email}`);

        // Use the API route to get predictions
        const encodedEmail = encodeURIComponent(session.user.email);
        const response = await fetch(
          `/api/user-predictions/${coinpair}/${encodedEmail}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch predictions");
        }

        setCurrentPredictions(data.current_predictions || []);
        setNextPredictions(data.next_predictions || []);

        console.log(
          `Current predictions: ${data.current_predictions?.length || 0}`
        );
        console.log(`Next predictions: ${data.next_predictions?.length || 0}`);
      } catch (err) {
        console.error("Error fetching user predictions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load predictions"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchPredictions();
    }
  }, [session?.user?.email, coinpair]);

  // Fetch agent messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/agent-messages/${coinpair}`);
        const result = await response.json();

        if (response.ok && result.success && result.data?.messages?.targetDate) {
          setTargetDate(formatDisplayTargetDate(result.data.messages.targetDate));
        } else if (response.ok && result.messages?.targetDate) {
          // Fallback for unwrapped response
          setTargetDate(formatDisplayTargetDate(result.messages.targetDate));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [coinpair]);

  // Find pair info from available pairs
  const currentPair = AVAILABLE_PAIRS.find(
    (pair) => pair.symbol === coinpair
  ) || {
    symbol: coinpair,
    name: coinpair.replace("USD", ""),
    color: "#cccccc",
  };

  // Get current price for this pair
  const currentPrice = prices?.find((p) => p.symbol === coinpair)?.price || 0;

  // Get the predictions for the active tab
  const activePredictions =
    activeTab === "current" ? currentPredictions : nextPredictions;

  return (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
      <PageTitle title={`${currentPair.name} Predictions`} />

      {/* User Info */}
      <UserProfileCard name={session.user.name} email={session.user.email} />

      {/* Stats */}
      <ProfileStatsCards
        currentPredictionsCount={currentPredictions.length}
        nextPredictionsCount={nextPredictions.length}
        currentPrice={currentPrice}
      />

      {/* Pair Selector */}
      <PairSelector currentPair={coinpair} />

      {/* Prediction Tabs */}
      <PredictionTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        targetDate={targetDate}
      />

      {/* Prediction List */}
      <PredictionList
        predictions={activePredictions}
        currentPrice={currentPrice}
        isLoading={isLoading}
        error={error}
      />

      {/* Historical Predictions Display */}
      <PredictionsDisplay className="mt-8" />
    </div>
  );
};
