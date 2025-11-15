/**
 * Types for profile components
 */

/**
 * Trading pair information
 */
export interface TradingPair {
  /** Symbol of the trading pair (e.g., "BTCUSD") */
  symbol: string;
  /** Name of the cryptocurrency (e.g., "Bitcoin") */
  name: string;
  /** Brand color for the cryptocurrency */
  color: string;
}

/**
 * Prediction data structure
 */
export interface PredictionData {
  /** Predicted high price */
  high: number;
  /** Predicted low price */
  low: number;
  /** Predicted closing price */
  close: number;
  /** Timestamp of when the prediction was made */
  timestamp: string;
}

/**
 * Response structure from the user predictions API
 */
export interface UserPredictionsResponse {
  /** Predictions for the current round */
  current_predictions: PredictionData[];
  /** Predictions for the next round */
  next_predictions: PredictionData[];
  /** Count of current round predictions */
  current_count: number;
  /** Count of next round predictions */
  next_count: number;
}

/**
 * Available tabs for prediction display
 */
export type PredictionTab = "current" | "next";

/**
 * Available trading pairs
 */
export const AVAILABLE_PAIRS: TradingPair[] = [
  { symbol: "BTCUSD", name: "Bitcoin", color: "#ff9900" },
  { symbol: "ETHUSD", name: "Ethereum", color: "#3c3c3d" },
  { symbol: "SOLUSD", name: "Solana", color: "#14F195" },
  { symbol: "XRPUSD", name: "Ripple", color: "#23292F" },
  { symbol: "BNBUSD", name: "BNB", color: "#F3BA2F" },
];
