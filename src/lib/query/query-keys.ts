/**
 * Query Keys Factory
 * Centralized query key management for React Query
 */

export const queryKeys = {
  // Predictions
  predictions: {
    all: ["predictions"] as const,
    lists: () => [...queryKeys.predictions.all, "list"] as const,
    list: (coinpair: string) =>
      [...queryKeys.predictions.lists(), coinpair] as const,
    personal: (coinpair: string) =>
      [...queryKeys.predictions.all, "personal", coinpair] as const,
    historical: (coinpair: string) =>
      [...queryKeys.predictions.all, "historical", coinpair] as const,
    user: (coinpair: string, userId?: string) =>
      [...queryKeys.predictions.all, "user", coinpair, userId] as const,
  },

  // Agent messages
  agentMessages: {
    all: ["agentMessages"] as const,
    detail: (coinpair: string) =>
      [...queryKeys.agentMessages.all, coinpair] as const,
  },

  // Leaderboard
  leaderboard: {
    all: ["leaderboard"] as const,
    list: () => [...queryKeys.leaderboard.all, "list"] as const,
    byCoinpair: (coinpair: string) =>
      [...queryKeys.leaderboard.all, coinpair] as const,
  },

  // Prices
  prices: {
    all: ["prices"] as const,
    current: (symbol: string) => [...queryKeys.prices.all, "current", symbol] as const,
    crypto: () => [...queryKeys.prices.all, "crypto"] as const,
  },

  // Binance data
  binance: {
    all: ["binance"] as const,
    klines: (params: {
      symbol: string;
      interval: string;
      startTime?: number;
      endTime?: number;
    }) => [...queryKeys.binance.all, "klines", params] as const,
  },
} as const;

