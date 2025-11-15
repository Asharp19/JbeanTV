"use client";
import { Card } from "@/components/ui/card";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { PairSelector } from "@/components/leaderboard/pair-selector";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

// Helper function to truncate wallet address
function truncateAddress(address?: string | null): string {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}` || "";
}

export function LeaderboardTable() {
  const {
    leaderboardEntries,
    loading,
    error,
    usingFallbackData,
    availablePairs,
  } = useLeaderboard();
  const [mounted, setMounted] = useState(false);
  const [selectedPair, setSelectedPair] = useState<string>("all");

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter entries based on selected pair
  const filteredEntries = useMemo(() => {
    if (selectedPair === "all") {
      return leaderboardEntries;
    }
    return leaderboardEntries
      .filter((entry) => entry.pair === selectedPair)
      .map((entry, index) => ({ ...entry, rank: index + 1 })); // Recalculate ranks for filtered entries
  }, [leaderboardEntries, selectedPair]);

  // Don&apos;t render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Card className="overflow-hidden bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-slate-400">Loading leaderboard data...</p>
        </div>
      </Card>
    );
  }

  // Show loading state
  if (loading && leaderboardEntries.length === 0) {
    return (
      <Card className="overflow-hidden bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-slate-400">Loading leaderboard data...</p>
        </div>
      </Card>
    );
  }

  // Show error state
  if (error && !usingFallbackData) {
    return (
      <Card className="overflow-hidden bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-red-500/10 p-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-red-500 font-medium">
            Error loading leaderboard data
          </p>
          <p className="mt-2 text-slate-400 text-center max-w-md">
            We&apos;re having trouble fetching the latest price data. Please try
            again later.
          </p>
        </div>
      </Card>
    );
  }

  // Show empty state
  if (filteredEntries.length === 0) {
    return (
      <Card className="overflow-hidden bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-slate-400">
            No leaderboard data available
            {selectedPair !== "all" ? ` for ${selectedPair}` : ""}
          </p>
        </div>
      </Card>
    );
  }

  // Show leaderboard table
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PairSelector
          selectedPair={selectedPair}
          onPairChange={setSelectedPair}
          pairs={availablePairs}
        />
      </div>

      <Card className="overflow-hidden bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass">
        {usingFallbackData && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-3 text-center">
            <p className="text-yellow-500 text-sm flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Using estimated prices. Live price data is currently unavailable.
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary">
                <th className="px-6 py-4 text-left text-sm font-medium text-content-primary">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-content-primary">
                  Wallet
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-content-primary">
                  Pair
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-content-primary">
                  Predicted Price
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-content-primary">
                  Current Price
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-content-primary">
                  Accuracy
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-content-primary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-glass transition-colors">
                  <td className="px-6 py-4 text-sm text-content-primary">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          entry.rank <= 3
                            ? "text-transparent bg-clip-text bg-gradient-primary shadow-glow"
                            : ""
                        }`}
                      >
                        #{entry.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-content-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary p-1.5 shadow-glow">
                        <Image
                          src="/icons/wallet.svg"
                          alt="Wallet"
                          width={24}
                          height={24}
                          className="w-full h-full text-content-primary"
                        />
                      </div>
                      <span>{truncateAddress(entry.walletAddress)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-content-primary">
                    {entry.pair}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-content-primary">
                    ${entry.predictedPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <div>
                      <span className="text-content-primary group relative">
                        $
                        {entry.currentPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: entry.currentPrice < 1 ? 6 : 2,
                        })}
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-background-secondary/90 backdrop-blur-md text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <span>Current:</span>
                              <span>
                                ${entry.currentPrice.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Predicted:</span>
                              <span>
                                ${entry.predictedPrice.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Difference:</span>
                              <span>
                                ${entry.priceDifference.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        entry.accuracy >= 90
                          ? "bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                          : entry.accuracy >= 70
                          ? "bg-yellow-500/10 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                          : "bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      }`}
                    >
                      {entry.accuracy.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.status === "completed"
                          ? "bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                          : "bg-blue-500/10 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
