import React from "react";
import { Message } from "../types";
import "./styles/jbean-card.css";
import { CardHeader } from "./nested/CardHeader";
import { DataBubble } from "./nested/DataBubble";
import { ChartWaves } from "./nested/ChartWaves";
import { WalletsBubble } from "./nested/WalletsBubble";
import { LoadingCard } from "./nested/LoadingCard";
import {
  extractPriceData,
  formatDisplayTargetDate,
  useExtractPriceData,
  useFormatDisplayTargetDate,
} from "./utils";
import { format } from "date-fns";

interface AgentCardViewProps {
  title: string;
  messages: Message[];
  isLoading?: boolean;
  currentMarketPrice?: number;
  targetDate?: string;
  contributorsData?: string;
  technicalMessages?: Message[];
  crowdMessages?: Message[];
}

export const AgentCardView = React.memo(function AgentCardView({
  title,
  messages,
  isLoading,
  currentMarketPrice,
  targetDate,
  contributorsData,
  technicalMessages,
  crowdMessages,
}: AgentCardViewProps) {
  // Extract price data from messages using memoized hook
  const priceData = useExtractPriceData(messages, currentMarketPrice);

  // Always call hooks unconditionally
  const technicalData = useExtractPriceData(
    technicalMessages || [],
    currentMarketPrice
  );

  const crowdData = useExtractPriceData(
    crowdMessages || [],
    currentMarketPrice
  );

  // For Coordinator Agent, calculate values as average of other agents
  let displayData = priceData;

  if (
    title.includes("Coordinator") &&
    technicalMessages &&
    crowdMessages &&
    technicalData &&
    crowdData
  ) {
    displayData = {
      ...priceData,
      high:
        technicalData.high && crowdData.high
          ? (technicalData.high + crowdData.high) / 2
          : priceData?.high || null,
      low:
        technicalData.low && crowdData.low
          ? (technicalData.low + crowdData.low) / 2
          : priceData?.low || null,
      close:
        technicalData.close && crowdData.close
          ? (technicalData.close + crowdData.close) / 2
          : priceData?.close || null,
      contributors: priceData?.contributors || undefined,
      analysis: priceData?.analysis || undefined,
      sentiment: priceData?.sentiment || "NEUTRAL",
    };
  }

  // Format the target date for display using memoized hook
  const formattedTargetDate = useFormatDisplayTargetDate(targetDate);

  // Calculate the percent off value
  const percentOff =
    displayData?.close && currentMarketPrice
      ? (
          ((displayData.close - currentMarketPrice) / currentMarketPrice) *
          100
        ).toFixed(2)
      : null;

  const sentiment = displayData?.sentiment || "NEUTRAL";

  // Assign playful gradient themes
  const cardTheme = title.includes("Technical")
    ? "theme-cosmic"
    : title.includes("Crowd")
    ? "theme-aurora"
    : "theme-ocean";

  const displayTitle = title.includes("Technical")
    ? "AI Predictions"
    : title.includes("Crowd")
    ? "Wisdom of Crowds"
    : "Coordinator Agent";

  // Determine what to show in the bottom section based on agent type
  const showContributors =
    displayTitle === "Wisdom of Crowds" &&
    (displayData?.contributors || contributorsData);
  const showTechnicalReasoning =
    displayTitle === "AI Predictions" && displayData?.analysis;
  const showCoordinatorContributors =
    displayTitle === "Coordinator Agent" && contributorsData;

  // Content for the bottom section
  const contributorsContent =
    displayTitle === "Coordinator Agent"
      ? contributorsData
      : displayData?.contributors || contributorsData;

  const technicalReasoningContent = displayData?.analysis;

  // Playful loading state
  if (isLoading || !displayData) {
    return (
      <LoadingCard
        cardTheme={cardTheme}
        displayTitle={displayTitle}
        formattedTargetDate={formattedTargetDate}
      />
    );
  }

  // Main card content
  return (
    <div className={`jbean-card ${cardTheme}`}>
      <div className="fluid-bg"></div>
      <div className="glow-orbs"></div>

      <CardHeader
        displayTitle={displayTitle}
        formattedTargetDate={formattedTargetDate}
      />

      {/* Card Body with fluid JBean styling */}
      <div className="card-body">
        {/* High/Low Section */}
        <div className="flex justify-between gap-2 mb-2">
          <DataBubble
            label="High"
            value={displayData.high ? displayData.high.toFixed(2) : "N/A"}
          />
          <DataBubble
            label="Low"
            value={displayData.low ? displayData.low.toFixed(2) : "N/A"}
          />
        </div>

        {/* Close price and Percent Off in a row */}
        <div className="flex justify-between items-center gap-2 mb-3">
          <DataBubble
            label="Price"
            value={displayData.close ? displayData.close.toFixed(2) : "N/A"}
            isMain={true}
          />
          <DataBubble
            label="Percent Off"
            value={
              percentOff
                ? (parseFloat(percentOff) >= 0 ? "+" : "") + percentOff + "%"
                : "N/A"
            }
            sentiment={
              parseFloat(percentOff || "0") >= 0 ? "bullish" : "bearish"
            }
          />
        </div>

        {/* Rest of content */}
        <div className="mt-2">
          {/* Technical Reasoning section - for Technical Analysis agent */}
          {showTechnicalReasoning && (
            <WalletsBubble
              title="Technical Reasoning"
              content={technicalReasoningContent ?? ""}
            />
          )}

          {/* Wallets section - for Crowd Analysis agent */}
          {showContributors && (
            <WalletsBubble
              title="Leading Wallets"
              content={contributorsContent ?? ""}
            />
          )}

          {/* Wallets section - for Coordinator Agent */}
          {showCoordinatorContributors && (
            <WalletsBubble
              title="Leading Wallets"
              content={contributorsData ?? ""}
            />
          )}

          {/* Animated fluid chart visualization */}
          <ChartWaves />
        </div>
      </div>
    </div>
  );
});
