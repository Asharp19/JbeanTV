/**
 * Prediction Service - Handles prediction data operations
 */

import { fetchJson } from "./api-client";
import { API_ENDPOINTS } from "../api/endpoints";
import type { Prediction } from "@/types/predictions";

export interface PredictionResponse {
  predictions: Prediction[];
  success?: boolean;
  error?: string;
}

/**
 * Fetch historical predictions for a coin pair
 */
export async function fetchHistoricalPredictions(
  coinPair: string
): Promise<Prediction[]> {
  const data = await fetchJson<PredictionResponse>(
    API_ENDPOINTS.predictions.historical(coinPair),
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );

  if (data.success && Array.isArray(data.predictions)) {
    return data.predictions;
  }

  throw new Error(data.error || "Failed to fetch historical predictions");
}

/**
 * Fetch personal predictions for a coin pair
 */
export async function fetchPersonalPredictions(
  coinPair: string
): Promise<Prediction[]> {
  const data = await fetchJson<PredictionResponse>(
    API_ENDPOINTS.predictions.personal(coinPair)
  );

  return data.predictions || [];
}

/**
 * Submit a user prediction
 */
export async function submitUserPrediction(
  symbol: string,
  predictionData: any
): Promise<any> {
  return fetchJson(API_ENDPOINTS.predictions.submit(symbol), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(predictionData),
  });
}

