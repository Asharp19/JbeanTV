"use client";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { TimeframeSelector } from "@/components/leaderboard/timeframe-selector";
import { CryptoIcon } from "@/app/predictions/[coinpair]/components/CryptoIcon";
import Link from "next/link";

// Available trading pairs with metadata
const AVAILABLE_PAIRS = [
  { symbol: "BTCUSD", name: "Bitcoin", color: "#ff9900" },
  { symbol: "ETHUSD", name: "Ethereum", color: "#627EEA" },
  { symbol: "SOLUSD", name: "Solana", color: "#14F195" },
  { symbol: "XRPUSD", name: "Ripple", color: "#d0e0f0" },
  { symbol: "BNBUSD", name: "BNB", color: "#F3BA2F" },
];

export default function LeaderboardsPage() {
  return (
    <main className="min-h-screen bg-gradient-page">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            Prediction Leaderboards
          </h1>
          <TimeframeSelector />
        </div>

        {/* Cryptocurrency Cards for Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {AVAILABLE_PAIRS.map((pair) => (
            <Link
              key={pair.symbol}
              href={`/leaderboards/${pair.symbol.toLowerCase()}`}
              className="relative overflow-hidden rounded-xl bg-background-secondary/30 border border-content-quaternary/30 backdrop-blur-sm hover:bg-background-secondary/50 transition-all duration-300 hover:shadow-lg hover:border-content-quaternary/60"
            >
              {/* Coin background shape */}
              <div
                className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-10"
                style={{ background: pair.color }}
              />

              <div className="p-4 flex flex-col items-center">
                <CryptoIcon
                  symbol={pair.symbol}
                  size={48}
                  color={pair.color}
                  className="mb-3"
                />
                <h3 className="font-medium text-slate-100">{pair.name}</h3>
                <p className="text-xs text-content-tertiary mt-1">
                  View leaderboard
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <LeaderboardTable />
        </div>
      </div>
    </main>
  );
}
