/**
 * Trading pair selector component
 */
"use client";

import { FC } from "react";
import Link from "next/link";
import { AVAILABLE_PAIRS, TradingPair } from "./types";

/**
 * Props for PairSelector component
 */
export interface PairSelectorProps {
  /** Currently selected coin pair */
  currentPair: string;
  /** Additional class names */
  className?: string;
}

/**
 * Component that allows users to switch between different trading pairs
 */
export const PairSelector: FC<PairSelectorProps> = ({
  currentPair,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xl font-bold text-slate-100 mb-4">
        Select Trading Pair
      </h3>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_PAIRS.map((pair) => (
          <Link
            key={pair.symbol}
            href={`/profile/${pair.symbol}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPair === pair.symbol
                ? "bg-brand-start text-white"
                : "bg-background-secondary/60 text-slate-100 hover:bg-background-secondary"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: pair.color }}
              />
              {pair.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
