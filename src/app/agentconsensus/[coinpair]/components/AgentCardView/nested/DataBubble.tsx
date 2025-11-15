import React from "react";

interface DataBubbleProps {
  label: string;
  value: string;
  isMain?: boolean;
  sentiment?: "bullish" | "bearish" | "neutral";
}

export function DataBubble({
  label,
  value,
  isMain = false,
  sentiment = "neutral",
}: DataBubbleProps) {
  const valueClassName =
    sentiment === "bullish"
      ? "bullish-value"
      : sentiment === "bearish"
      ? "bearish-value"
      : "data-value";

  if (isMain) {
    return (
      <div className="data-bubble main-bubble flex-1 ">
        <div className="text-center text-sm font-bold text-slate-300">
          {label}
        </div>
        <div
          className="main-value text-center"
          style={{ fontSize: "min(3.5vw, 2.5rem)" }}
        >
          {value}
        </div>
      </div>
    );
  }

  // For Percent Off bubble
  if (label === "Percent Off") {
    return (
      <div className="data-bubble percent-bubble w-[100px] flex-none">
        <div className="data-label text-xs text-center">{label}</div>
        <div className={`${valueClassName} text-center font-bold`}>{value}</div>
      </div>
    );
  }

  // Standard bubble (High/Low)
  return (
    <div className="data-bubble flex-1">
      <div className="data-label text-center">{label}</div>
      <div className={`${valueClassName} text-center`}>{value}</div>
    </div>
  );
}
