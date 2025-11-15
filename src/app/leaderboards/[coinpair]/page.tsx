"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { TimeframeSelector } from "@/components/leaderboard/timeframe-selector";
import { CoinLeaderboardTable } from "./components/CoinLeaderboardTable";
import { DetailedStatsCard } from "./components/DetailedStatsCard";
import { TopPredictorsCard } from "./components/TopPredictorsCard";
import { CryptoIcon } from "@/app/predictions/[coinpair]/components/CryptoIcon";
import Link from "next/link";

// Available trading pairs with metadata
const AVAILABLE_PAIRS = [
  { symbol: "BTCUSD", name: "Bitcoin", color: "#ff9900" },
  { symbol: "ETHUSD", name: "Ethereum", color: "#627EEA" },
  { symbol: "SOLUSD", name: "Solana", color: "#14F195" },
  { symbol: "XRPUSD", name: "Ripple", color: "#d0e0f0" },
  { symbol: "BNBUSD", name: "BNB", color: "#F3BA2F" },
  { symbol: "AVAXUSD", name: "Avalanche", color: "#E84142" },
];

interface CoinLeaderboardPageProps {
  params: {
    coinpair: string;
  };
}

export default function CoinLeaderboardPage({
  params,
}: CoinLeaderboardPageProps) {
  const router = useRouter();
  const { coinpair } = params;
  const [mounted, setMounted] = useState(false);

  // Find current pair details
  const currentPair = AVAILABLE_PAIRS.find(
    (pair) => pair.symbol.toLowerCase() === coinpair.toLowerCase()
  );

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate the coinpair parameter
  useEffect(() => {
    if (mounted && !currentPair) {
      notFound();
    }
  }, [mounted, currentPair]);

  if (!mounted || !currentPair) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-page">
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/leaderboards"
              className="text-content-secondary hover:text-content-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
              <CryptoIcon
                symbol={currentPair.symbol}
                size={36}
                color={currentPair.color}
              />
              {currentPair.name} Leaderboard
            </h1>
          </div>
          <TimeframeSelector />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats and Top Predictors */}
          <div className="flex flex-col gap-6">
            <DetailedStatsCard coinpair={coinpair} currentPair={currentPair} />
            <TopPredictorsCard coinpair={coinpair} currentPair={currentPair} />
          </div>

          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <CoinLeaderboardTable
              coinpair={coinpair}
              currentPair={currentPair}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
