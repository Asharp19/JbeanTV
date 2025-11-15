"use client";
import { Card } from "@/components/ui/card";
import { CryptoIcon } from "@/app/predictions/[coinpair]/components/CryptoIcon";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTickerContext } from "@/contexts/TickerContext";

interface TopPredictorEntry {
  id: string;
  walletAddress: string;
  accuracy: number;
  predictedPrice: number;
  currentPrice: number;
  rank: number;
}

interface TopPredictorsCardProps {
  coinpair: string;
  currentPair: {
    symbol: string;
    name: string;
    color: string;
  };
}

export function TopPredictorsCard({
  coinpair,
  currentPair,
}: TopPredictorsCardProps) {
  const { allTickersData, isAllConnected, addPair } = useTickerContext();
  const [topPredictors, setTopPredictors] = useState<TopPredictorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Truncate wallet address
  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Add the pair to the watched list
  useEffect(() => {
    const formattedPair = coinpair.replace(/USD$/, "/USDT").toUpperCase();
    if (addPair) {
      addPair(formattedPair);
    }
  }, [coinpair, addPair]);

  // Fetch top predictors with real-time price data
  useEffect(() => {
    const fetchTopPredictors = async () => {
      try {
        setLoading(true);

        // Format the pair symbol for the WebSocket API
        const pairSymbol = coinpair.replace(/USD$/, "/USDT").toUpperCase();

        // Get real-time ticker data
        const tickerData = allTickersData[pairSymbol];

        if (!tickerData && !isAllConnected) {
          // Wait for WebSocket connection
          return;
        }

        // If no real-time data after connection is established, use backup value
        const currentPrice = tickerData?.price || getBackupPrice(coinpair);

        // Generate top predictors with current price
        const mockPredictors: TopPredictorEntry[] = Array.from({
          length: 5,
        }).map((_, index) => {
          // Accuracy decreases slightly with rank
          const accuracy = 99 - index * 2.5;

          // Predicted price is close to current price, with slight variations
          // More accurate for higher ranks
          const variance =
            Math.random() * (0.04 - index * 0.005) - (0.02 - index * 0.0025);
          const predictedPrice = currentPrice * (1 + variance);

          return {
            id: `${coinpair}-${index}`,
            walletAddress: generateRandomWalletAddress(),
            accuracy,
            predictedPrice,
            currentPrice,
            rank: index + 1,
          };
        });

        setTopPredictors(mockPredictors);
        setError(null);
      } catch (err) {
        console.error("Error processing top predictors:", err);
        setError("Failed to load top predictors");
      } finally {
        setLoading(false);
      }
    };

    fetchTopPredictors();

    // Set up an interval to refresh data every 10 seconds
    const interval = setInterval(fetchTopPredictors, 10000);

    return () => clearInterval(interval);
  }, [coinpair, allTickersData, isAllConnected]);

  // Generate random wallet address
  function generateRandomWalletAddress(): string {
    return `0x${Math.random().toString(16).substring(2, 8)}...${Math.random()
      .toString(16)
      .substring(2, 6)}`;
  }

  // Backup price if real-time data isn't available
  function getBackupPrice(pair: string): number {
    switch (pair.toUpperCase()) {
      case "BTCUSD":
        return 62450.75;
      case "ETHUSD":
        return 3021.45;
      case "SOLUSD":
        return 112.8;
      case "XRPUSD":
        return 0.52;
      case "BNBUSD":
        return 580.25;
      case "AVAXUSD":
        return 32.18;
      default:
        return 100.0;
    }
  }

  if (loading) {
    return (
      <Card className="bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded"></div>
                  <div className="h-3 bg-slate-700 rounded w-5/6 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center p-4">
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
            Error loading top predictors
          </p>
        </div>
      </Card>
    );
  }

  if (!topPredictors.length) {
    return (
      <Card className="bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-content-secondary">No top predictors found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass overflow-hidden">
      <div className="relative">
        {/* Header with background gradient */}
        <div
          className="p-6 border-b border-content-quaternary"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0))`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-gradient-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Top Predictors</h3>
          </div>
        </div>

        {/* List of top predictors */}
        <div className="p-3 divide-y divide-content-quaternary/30">
          {topPredictors.map((predictor) => (
            <div
              key={predictor.id}
              className="p-3 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      predictor.rank <= 3
                        ? "bg-gradient-primary shadow-glow"
                        : "bg-background-tertiary"
                    }`}
                  >
                    <span className="font-bold text-white">
                      #{predictor.rank}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gradient-primary p-1 shadow-glow">
                        <Image
                          src="/icons/wallet.svg"
                          alt="Wallet"
                          width={12}
                          height={12}
                          className="w-full h-full text-content-primary"
                        />
                      </div>
                      <p className="font-medium text-content-primary">
                        {truncateAddress(predictor.walletAddress)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <CryptoIcon
                        symbol={currentPair.symbol}
                        size={14}
                        color={currentPair.color}
                      />
                      <span className="text-xs text-content-secondary">
                        Predicted: $
                        {predictor.predictedPrice.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded-full 
                      ${
                        predictor.accuracy >= 90
                          ? "bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                          : "bg-yellow-500/10 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                      }`}
                  >
                    {predictor.accuracy.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
