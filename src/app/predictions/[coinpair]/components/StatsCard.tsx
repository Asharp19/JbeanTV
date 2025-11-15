"use client";

import { StatsIcon } from "@/components/ui/icons";
import { RefObject, useEffect, useState, useRef } from "react";
import { CryptoIcon } from "./CryptoIcon";
import { PredictionJars, PredictionJarsHandle } from "./PredictionJars";
import { CountdownAlert } from "@/components/CountdownAlert";
import { gsap } from "gsap";

interface StatsCardProps {
  stats: {
    totalPredictions: number;
    rewardPool: string;
    currentStreak: number;
    targetDate: string;
  };
  fetchFromMongoDB?: boolean;
  pair: {
    color: string;
    name: string;
    icon?: string;
    symbol: string;
    predictions: number;
    currentPrice?: number;
  };
  jarsRef: RefObject<PredictionJarsHandle>;
}

export function StatsCard({
  stats: initialStats,
  fetchFromMongoDB = false,
  pair,
  jarsRef,
}: StatsCardProps) {
  const [isLoading, setIsLoading] = useState(fetchFromMongoDB);
  const [showLocalTime, setShowLocalTime] = useState(false);
  const toggleCircleRef = useRef<HTMLDivElement>(null);
  const toggleTrackRef = useRef<HTMLDivElement>(null);

  const accentColor = "#9ef0ff";
  console.log("StatsCard received stats:", initialStats);
  console.log("Target date value:", initialStats.targetDate);

  const toggleTimeFormat = () => {
    setShowLocalTime(!showLocalTime);

    // Animate the toggle with GSAP
    if (toggleCircleRef.current && toggleTrackRef.current) {
      if (!showLocalTime) {
        // Animate to "on" state
        gsap.to(toggleCircleRef.current, {
          x: 22,
          backgroundColor: accentColor,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(toggleTrackRef.current, {
          backgroundColor: `${accentColor}40`,
          duration: 0.3,
        });
      } else {
        // Animate to "off" state
        gsap.to(toggleCircleRef.current, {
          x: 0,
          backgroundColor: "#64748b",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(toggleTrackRef.current, {
          backgroundColor: "rgba(30,41,59,0.6)",
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div className="rounded-2xl bg-[rgba(11,17,43,0.8)] backdrop-blur-xl border  border-indigo-500/30 p-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            {pair?.symbol ? (
              <CryptoIcon symbol={pair.symbol} size={22} color={accentColor} />
            ) : (
              <div className="w-5 h-5" style={{ color: accentColor }}>
                <StatsIcon className="w-full h-full" />
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-content-primary to-content-secondary bg-clip-text text-transparent">
            Market Statistics
          </h3>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-[220px] sm:w-[250px] h-full">
            <PredictionJars ref={jarsRef} pair={pair} />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatItem
                label="Total Predictions"
                value={initialStats.totalPredictions?.toLocaleString() ?? "0"}
                icon="📊"
                accentColor={accentColor}
              />
              <StatItem
                label="Reward Pool"
                value={initialStats.rewardPool}
                icon="💰"
                accentColor={accentColor}
              />
            </div>
            <StatItem
              label="Target Date"
              value={
                initialStats.targetDate ? (
                  <span>
                    <span className="text-slate-300 text-[1rem] font-normal">
                      Daily close of
                    </span>
                    <br />
                    <span className="text-slate-300 text-[1.5rem]">
                      {formatTargetDate(initialStats.targetDate).split(",")[0]}
                    </span>
                    <br />
                    <br />
                    <div className="flex flex-col justify-between items-left mb-1">
                      <span className="text-slate-300 text-[1rem] font-normal">
                        Round Closes in:
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[0.7rem] text-slate-400">
                          Countdown
                        </span>
                        {/* Toggle Switch */}
                        <div
                          ref={toggleTrackRef}
                          className="w-12 h-6 rounded-full bg-[rgba(30,41,59,0.6)] relative cursor-pointer"
                          onClick={toggleTimeFormat}
                        >
                          <div
                            ref={toggleCircleRef}
                            className="absolute left-1 top-1 w-4 h-4 rounded-full bg-slate-500 transition-transform shadow-md"
                          ></div>
                        </div>
                        <span className="text-[0.7rem] text-slate-400">
                          Local Date and Time
                        </span>
                      </div>
                    </div>

                    <CountdownAlert
                      className="mb-4 w-full flex flex-col justify-center"
                      showLocalTime={showLocalTime}
                    />
                  </span>
                ) : (
                  ""
                )
              }
              icon="🕒"
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | React.ReactNode;
  icon?: string;
  accentColor?: string;
}

function StatItem({
  label,
  value,
  icon,
  accentColor = "#3B82F6",
}: StatItemProps) {
  return (
    <div className="flex-1 p-5 rounded-xl bg-[rgba(30,41,59,0.4)] hover:bg-[rgba(30,41,59,0.6)] border border-content-quaternary/30 hover:border-content-quaternary/60 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        {icon && <span className="text-lg">{icon}</span>}
        <div className="text-sm font-medium text-content-tertiary">{label}</div>
      </div>
      <div className="text-2xl font-bold" style={{ color: accentColor }}>
        {value}
      </div>
    </div>
  );
}

// Add a helper function to format the date
function formatTargetDate(dateString: string): string {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";

    return `${month} ${day}, ${hour}:${minute} ${period} UTC`;
  } catch (error) {
    console.error("Error formatting target date:", error);
    return "-";
  }
}

// Add a helper function to format the date in local time
function formatLocalTargetDate(dateString: string): string {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    const month = date.toLocaleString(undefined, { month: "short" });
    const day = date.getDate();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return `${month} ${day}, ${hour}:${minute} ${period} (${timezone})`;
  } catch (error) {
    console.error("Error formatting local target date:", error);
    return "-";
  }
}
