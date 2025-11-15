/**
 * Leaderboard Service - Handles leaderboard data operations
 */

import { fetchJson } from "./api-client";
import { API_ENDPOINTS } from "../api/endpoints";
import { calculateAccuracy } from "../utils/data-transformers";
import type { LeaderboardEntry } from "@/types/predictions";

export type WalletType =
  | "metamask"
  | "trustwallet"
  | "phantom"
  | "ledger"
  | "trezor"
  | "email";

export interface LeaderboardPrediction {
  _id: string;
  walletAddress: string;
  walletType: WalletType;
  pair: string;
  predictedPrice: number;
  predictedAt: string;
  targetDate: string;
}

export interface LeaderboardResponse {
  predictions: LeaderboardPrediction[];
}

/**
 * Fetch predictions from the leaderboard API
 */
export async function fetchLeaderboardPredictions(): Promise<
  LeaderboardPrediction[]
> {
  const data = await fetchJson<LeaderboardResponse>(API_ENDPOINTS.leaderboard);

  if (!data.predictions || !Array.isArray(data.predictions)) {
    throw new Error("Invalid predictions data received from API");
  }

  return data.predictions;
}

/**
 * Calculate leaderboard entry from prediction and current price
 */
export function calculateLeaderboardEntry(
  prediction: LeaderboardPrediction,
  currentPrice: number
): LeaderboardEntry {
  const priceDifference = Math.abs(
    prediction.predictedPrice - currentPrice
  );
  const accuracy = calculateAccuracy(prediction.predictedPrice, currentPrice);

  return {
    id: prediction._id,
    walletAddress: prediction.walletAddress,
    walletType: prediction.walletType,
    pair: prediction.pair,
    predictedPrice: Number(prediction.predictedPrice),
    predictedAt: prediction.predictedAt,
    targetDate: prediction.targetDate,
    currentPrice,
    priceDifference,
    accuracy,
    rank: 0,
    status:
      new Date(prediction.targetDate) > new Date() ? "pending" : "completed",
  };
}

/**
 * Sort and rank leaderboard entries
 */
export function rankLeaderboardEntries(
  entries: LeaderboardEntry[]
): LeaderboardEntry[] {
  return entries
    .sort((a, b) => b.accuracy - a.accuracy)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

/**
 * Get unique pairs from predictions
 */
export function extractUniquePairs(
  predictions: LeaderboardPrediction[]
): string[] {
  const pairs = new Set(predictions.map((prediction) => prediction.pair));
  return Array.from(pairs).sort();
}

