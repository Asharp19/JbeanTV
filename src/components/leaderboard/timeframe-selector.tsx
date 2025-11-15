import { useState } from "react";

export function TimeframeSelector() {
  const [timeframe, setTimeframe] = useState("1D");

  return (
    <div className="relative inline-block">
      <select
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
        className="appearance-none bg-background-secondary/40 text-slate-100 px-4 py-2 pr-8 rounded-lg border border-slate-100/10 cursor-pointer hover:bg-input transition-colors"
      >
        <option value="1D">1 Day</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-100">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
