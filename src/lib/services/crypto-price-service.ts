/**
 * Crypto Price Service - Handles crypto price data fetching
 */

import { fetchJson } from "./api-client";
import { API_ENDPOINTS } from "../api/endpoints";
import type { PairPrice } from "@/types/predictions";

export interface CryptoPricesResponse {
  prices: PairPrice[];
}

/**
 * Fetch current crypto prices
 */
export async function fetchCryptoPrices(): Promise<PairPrice[]> {
  const data = await fetchJson<CryptoPricesResponse>(
    API_ENDPOINTS.cryptoPrices,
    {
      timeout: 5000,
      retries: 3,
      retryDelay: 2000,
    }
  );

  return data.prices;
}

