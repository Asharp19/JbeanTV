export interface Prediction {
  id: string;
  walletAddress: string;
  walletType:
    | "metamask"
    | "trustwallet"
    | "phantom"
    | "ledger"
    | "trezor"
    | "email";
  pair: string;
  predictedPrice: number;
  predictedAt: string;
  targetDate: string;
  currentPrice: number;
  accuracy: number;
  rank?: number;
}

export interface PairPrice {
  symbol: string;
  price: number;
  lastUpdated: string;
}

export interface LeaderboardEntry extends Prediction {
  rank: number;
  priceDifference: number;
  status: "pending" | "completed";
}

// Current approximate prices as of Feb 2024
const CURRENT_PRICES = {
  BTCUSD: 96292.29,
  ETHUSD: 5243.87,
  SOLUSD: 198.69,
};

// Helper function to generate a random price within specified range
function generatePredictedPrice(
  basePrice: number,
  maxDeviation: number
): number {
  // For the first 10 predictions, use a tighter range (0-1.5%)
  const deviation = maxDeviation * (Math.random() * 2 - 1); // Random between -maxDeviation and +maxDeviation
  return Math.round(basePrice * (1 + deviation));
}

// Helper to generate random wallet address
function generateWalletAddress(): string {
  return (
    "0x" +
    Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")
  );
}

// Wallet types array for random selection
const WALLET_TYPES: Array<Prediction["walletType"]> = [
  "metamask",
  "trustwallet",
  "phantom",
  "ledger",
  "trezor",
];

// Mock data for initial predictions
export const mockPredictions: Prediction[] = [
  // First 10 predictions with high accuracy (0-1.5% deviation)
  ...Array.from({ length: 10 }, (_, i) => {
    const pair = ["BTCUSD", "ETHUSD", "SOLUSD"][i % 3];
    return {
      id: (i + 1).toString(),
      walletAddress: generateWalletAddress(),
      walletType: WALLET_TYPES[Math.floor(Math.random() * WALLET_TYPES.length)],
      pair,
      predictedPrice: generatePredictedPrice(
        CURRENT_PRICES[pair as keyof typeof CURRENT_PRICES],
        0.015
      ),
      predictedAt: "2024-02-20T10:00:00Z",
      targetDate: "2024-03-20T10:00:00Z",
      currentPrice: 0,
      accuracy: 0,
    };
  }),

  // Remaining predictions with wider range (1.5-4% deviation)
  ...Array.from({ length: 5 }, (_, i) => {
    const pair = ["BTCUSD", "ETHUSD", "SOLUSD"][i % 3];
    return {
      id: (i + 11).toString(),
      walletAddress: generateWalletAddress(),
      walletType: WALLET_TYPES[Math.floor(Math.random() * WALLET_TYPES.length)],
      pair,
      predictedPrice: generatePredictedPrice(
        CURRENT_PRICES[pair as keyof typeof CURRENT_PRICES],
        0.04
      ),
      predictedAt: "2024-02-20T10:00:00Z",
      targetDate: "2024-03-20T10:00:00Z",
      currentPrice: 0,
      accuracy: 0,
    };
  }),
];
