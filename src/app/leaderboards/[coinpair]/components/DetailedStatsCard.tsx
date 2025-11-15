"use client";
import { Card } from "@/components/ui/card";
import { CryptoIcon } from "@/app/predictions/[coinpair]/components/CryptoIcon";
import { useState, useEffect } from "react";
import { useTickerContext } from "@/contexts/TickerContext";

interface DetailedStatsCardProps {
  coinpair: string;
  currentPair: {
    symbol: string;
    name: string;
    color: string;
  };
}

interface PriceStats {
  currentPrice: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  totalPredictions: number;
  averageAccuracy: number;
  bestPrediction: {
    accuracy: number;
    walletAddress: string;
    predictedPrice: number;
  };
}

export function DetailedStatsCard({
  coinpair,
  currentPair,
}: DetailedStatsCardProps) {
  const { allTickersData, isAllConnected, addPair } = useTickerContext();
  const [priceStats, setPriceStats] = useState<PriceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add the pair to the watched list
  useEffect(() => {
    const formattedPair = coinpair.replace(/USD$/, "/USDT").toUpperCase();
    if (addPair) {
      addPair(formattedPair);
    }
  }, [coinpair, addPair]);

  // Update price statistics from real-time data
  useEffect(() => {
    const fetchPriceStats = async () => {
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

        // If no real-time data after connection is established, use backup values
        const currentPrice = tickerData?.price || getBackupPrice(coinpair);

        // Fetch additional statistics
        // In production, this would come from a real API
        // For now, we'll simulate with derived values
        const high24h = tickerData?.high24h || currentPrice * 1.03; // 3% higher than current
        const low24h = tickerData?.low24h || currentPrice * 0.97; // 3% lower than current
        const volume24h = tickerData?.volume || calculateBackupVolume(coinpair);

        // Set the price statistics
        setPriceStats({
          currentPrice,
          high24h,
          low24h,
          volume24h,
          marketCap: calculateMarketCap(coinpair, currentPrice),
          totalPredictions: calculateTotalPredictions(coinpair),
          averageAccuracy: calculateAverageAccuracy(coinpair),
          bestPrediction: {
            accuracy: calculateBestAccuracy(coinpair),
            walletAddress: "0x123...abc",
            predictedPrice: currentPrice * 0.99, // Close prediction
          },
        });

        setError(null);
      } catch (err) {
        console.error("Error processing price stats:", err);
        setError("Failed to load price statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceStats();

    // Set up an interval to refresh data every 5 seconds
    const interval = setInterval(fetchPriceStats, 5000);

    return () => clearInterval(interval);
  }, [coinpair, allTickersData, isAllConnected]);

  // Backup values if real-time data isn't available
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

  function calculateBackupVolume(pair: string): number {
    switch (pair.toUpperCase()) {
      case "BTCUSD":
        return 28500000000;
      case "ETHUSD":
        return 12500000000;
      case "SOLUSD":
        return 4250000000;
      case "XRPUSD":
        return 2100000000;
      case "BNBUSD":
        return 1800000000;
      case "AVAXUSD":
        return 950000000;
      default:
        return 1000000000;
    }
  }

  function calculateMarketCap(pair: string, price: number): number {
    const supplies: Record<string, number> = {
      BTCUSD: 19500000,
      ETHUSD: 120000000,
      SOLUSD: 400000000,
      XRPUSD: 45000000000,
      BNBUSD: 155000000,
      AVAXUSD: 360000000,
    };

    const supply = supplies[pair.toUpperCase()] || 100000000;
    return price * supply;
  }

  function calculateTotalPredictions(pair: string): number {
    switch (pair.toUpperCase()) {
      case "BTCUSD":
        return 1250;
      case "ETHUSD":
        return 870;
      case "SOLUSD":
        return 420;
      case "XRPUSD":
        return 320;
      case "BNBUSD":
        return 280;
      case "AVAXUSD":
        return 210;
      default:
        return 100;
    }
  }

  function calculateAverageAccuracy(pair: string): number {
    switch (pair.toUpperCase()) {
      case "BTCUSD":
        return 87.5;
      case "ETHUSD":
        return 84.2;
      case "SOLUSD":
        return 82.1;
      case "XRPUSD":
        return 80.8;
      case "BNBUSD":
        return 83.5;
      case "AVAXUSD":
        return 81.2;
      default:
        return 80.0;
    }
  }

  function calculateBestAccuracy(pair: string): number {
    switch (pair.toUpperCase()) {
      case "BTCUSD":
        return 99.2;
      case "ETHUSD":
        return 98.7;
      case "SOLUSD":
        return 97.5;
      case "XRPUSD":
        return 96.8;
      case "BNBUSD":
        return 98.2;
      case "AVAXUSD":
        return 97.1;
      default:
        return 95.0;
    }
  }

  if (loading) {
    return (
      <Card className="bg-background-secondary/40 border-primary backdrop-blur-xl shadow-glass p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
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
            Error loading price statistics
          </p>
        </div>
      </Card>
    );
  }

  if (!priceStats) {
    return null;
  }

  // Format large numbers
  const formatNumber = (num: number, suffix = "") => {
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B${suffix}`;
    }
    if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M${suffix}`;
    }
    if (num >= 1e3) {
      return `${(num / 1e3).toFixed(2)}K${suffix}`;
    }
    return num.toLocaleString();
  };

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
            <CryptoIcon
              symbol={currentPair.symbol}
              size={24}
              color={currentPair.color}
            />
            <h3 className="text-xl font-bold text-white">
              {currentPair.name} Statistics
            </h3>
          </div>
        </div>

        {/* Stats grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">Current Price</p>
            <p className="text-lg font-medium text-content-primary">
              $
              {priceStats.currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: priceStats.currentPrice < 1 ? 6 : 2,
              })}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">24h Range</p>
            <p className="text-lg font-medium text-content-primary">
              $
              {priceStats.low24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              - $
              {priceStats.high24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">24h Volume</p>
            <p className="text-lg font-medium text-content-primary">
              ${formatNumber(priceStats.volume24h)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">Market Cap</p>
            <p className="text-lg font-medium text-content-primary">
              ${formatNumber(priceStats.marketCap)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">Predictions Made</p>
            <p className="text-lg font-medium text-content-primary">
              {priceStats.totalPredictions.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-content-tertiary">Average Accuracy</p>
            <p className="text-lg font-medium text-content-primary">
              {priceStats.averageAccuracy.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Best prediction */}
        <div className="p-6 pt-0">
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent border border-content-quaternary/30">
            <p className="text-sm font-medium text-white">Best Prediction</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-content-tertiary">Wallet</p>
                <p className="text-md font-medium text-content-primary">
                  {priceStats.bestPrediction.walletAddress}
                </p>
              </div>
              <div>
                <p className="text-sm text-content-tertiary">Accuracy</p>
                <p className="text-md font-medium text-green-400">
                  {priceStats.bestPrediction.accuracy.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
