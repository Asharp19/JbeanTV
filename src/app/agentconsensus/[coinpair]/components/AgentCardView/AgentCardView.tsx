import React from "react";
import { DataBubble } from "./nested/DataBubble";

interface AgentCardContentProps {
  agentData?: {
    Name?: string;
  };
  description?: string;
  formattedPrice: string;
  formattedHigh: string;
  formattedLow: string;
  percentOffHigh: string;
  highSentiment: "bullish" | "bearish" | "neutral";
  lowSentiment: "bullish" | "bearish" | "neutral";
}

export const AgentCardContent: React.FC<AgentCardContentProps> = ({
  agentData,
  description,
  formattedPrice,
  formattedHigh,
  formattedLow,
  percentOffHigh,
  highSentiment,
  lowSentiment,
}) => {
  return (
    <div className="agent-card-container">
      <div className="card-top flex flex-col md:flex-row items-center md:items-start justify-between gap-2 p-4">
        <div className="card-top-left flex flex-col items-center md:items-start gap-1">
          <div className="text-center md:text-left text-sm md:text-base text-slate-300">
            {agentData?.Name}
          </div>
          <div
            className="text-center md:text-left text-xs md:text-sm text-slate-400"
            style={{ maxWidth: "90%" }}
          >
            {description}
          </div>
        </div>
      </div>
      <div className="card-middle flex-grow p-4">
        <div className="data-bubbles-container grid grid-cols-1 gap-3">
          <div className="flex gap-3">
            <DataBubble label="Price" value={formattedPrice} isMain={true} />
          </div>
          <div className="flex gap-3">
            <DataBubble
              label="High"
              value={formattedHigh}
              sentiment={highSentiment}
            />
            <DataBubble
              label="Low"
              value={formattedLow}
              sentiment={lowSentiment}
            />
            <DataBubble
              label="Percent Off"
              value={percentOffHigh}
              sentiment={parseFloat(percentOffHigh) < 0 ? "bullish" : "bearish"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
