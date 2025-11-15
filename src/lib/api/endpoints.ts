/**
 * API Endpoints - Centralized API route definitions
 */

export const API_ENDPOINTS = {
  // Crypto prices
  cryptoPrices: "/api/crypto-prices",

  // Leaderboard
  leaderboard: "/api/leaderboard",

  // Predictions
  predictions: {
    personal: (coinpair: string) => `/api/personal-predictions/${coinpair}`,
    user: (coinpair: string) => `/api/user-predictions/${coinpair}`,
    historical: (coinpair: string) => `/api/historical-predictions/${coinpair}`,
    submit: (symbol: string) =>
      `/api/proxy/submit-user-prediction/${symbol}`,
  },

  // Agent messages
  agentMessages: (coinpair: string) => `/api/agent-messages/${coinpair}`,

  // Binance
  binance: {
    klines: (params: {
      symbol: string;
      interval: string;
      startTime: number;
      endTime: number;
    }) =>
      `/api/binance/klines?symbol=${params.symbol}&interval=${params.interval}&startTime=${params.startTime}&endTime=${params.endTime}`,
  },

  // Chat
  chatHistory: (sessionId: string) => `/api/chat-history/${sessionId}`,
  chatWithCEO: "/api/chat-with-ceo",

  // Consensus
  consensus: "/api/consensus",

  // Statistics
  statistics: "/api/statistics",
} as const;

