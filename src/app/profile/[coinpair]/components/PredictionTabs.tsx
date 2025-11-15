/**
 * Tabs component for switching between prediction types
 */
"use client";

import { FC } from "react";
import { PredictionTab } from "./types";
import { format } from "date-fns";
import { useFormatDisplayTargetDate } from "@/app/agentconsensus/[coinpair]/components/AgentCardView/utils";

/**
 * Props for PredictionTabs component
 */
export interface PredictionTabsProps {
  /** Currently active tab */
  activeTab: PredictionTab;
  /** Called when the active tab changes */
  onTabChange: (tab: PredictionTab) => void;
  /** Target date for next round predictions */
  targetDate: string | null;
  /** Additional class names */
  className?: string;
}

/**
 * Component that allows switching between current and next round predictions
 */
export const PredictionTabs: FC<PredictionTabsProps> = ({
  activeTab,
  onTabChange,
  targetDate,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="border-b border-slate-700/50">
        <div className="flex">
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${
              activeTab === "current"
                ? "border-brand-start text-brand-start"
                : "border-transparent text-slate-100/70 hover:text-slate-100 hover:border-slate-700"
            }`}
            onClick={() => onTabChange("current")}
          >
            Current Round
            {targetDate && activeTab === "current" && (
              <span className="ml-2 text-xs bg-brand-end/20 text-brand-start px-2 py-1 rounded">
                Target: Daily close of{" "}
                {targetDate
                  ?.split(",")[0]
                  ?.replace(/(\d+)/, (num) => String(parseInt(num) - 1))}{" "}
                @ {targetDate} {" UTC"}
              </span>
            )}
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium border-b-2 ${
              activeTab === "next"
                ? "border-brand-start text-brand-start"
                : "border-transparent text-slate-100/70 hover:text-slate-100 hover:border-slate-700"
            }`}
            onClick={() => onTabChange("next")}
          >
            Next Round
            {targetDate && activeTab === "next" && (
              <span className="ml-2 text-xs bg-brand-end/20 text-brand-start px-2 py-1 rounded">
                Target: Daily close of{" "}
                {targetDate
                  ?.split(",")[0]
                  ?.replace(/(\d+)/, (num) => String(parseInt(num)))}{" "}
                @{" "}
                {targetDate
                  ?.split(",")[0]
                  ?.replace(/(\d+)/, (num) => String(parseInt(num) + 1))}{" "}
                12:01 AM UTC
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
