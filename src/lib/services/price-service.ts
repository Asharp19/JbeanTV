/**
 * Price Service - Handles price data operations
 */

import { fetchJson } from "./api-client";

export interface PriceStats {
  highPrice: number;
  lowPrice: number;
}

export interface PriceData {
  currentPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  isLoading: boolean;
  error?: string;
}

/**
 * Fetch current price for a symbol
 */
export async function fetchCurrentPrice(symbol: string): Promise<number> {
  // Import from existing price-api util
  const { fetchCurrentPrice: originalFetch } = await import(
    "@/lib/utils/price-api"
  );
  return originalFetch(symbol);
}

/**
 * Fetch 24hr stats for a symbol
 */
export async function fetch24hrStats(symbol: string): Promise<PriceStats> {
  const { fetch24hrStats: originalFetch } = await import(
    "@/lib/utils/price-api"
  );
  return originalFetch(symbol);
}

/**
 * Fetch complete price data for a symbol
 */
export async function fetchPriceData(
  symbol: string
): Promise<Omit<PriceData, "isLoading" | "error">> {
  const [currentPrice, stats] = await Promise.all([
    fetchCurrentPrice(symbol),
    fetch24hrStats(symbol),
  ]);

  return {
    currentPrice,
    highPrice: stats.highPrice,
    lowPrice: stats.lowPrice,
  };
}

/**
 * Format price for display
 */
export function formatPrice(
  price: number | undefined,
  currency: string = "USD"
): string {
  if (!price) return "-";

  return price.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  });
}

