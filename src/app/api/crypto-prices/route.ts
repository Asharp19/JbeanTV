import {
  successResponse,
  errorFromException,
} from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

// List of cryptocurrency pairs we want to fetch
const PAIRS = [
  "BTCUSD", // Bitcoin
  "ETHUSD", // Ethereum
  "SOLUSD", // Solana
  "AVAXUSD", // Avalanche
  "XRPUSD", // Ripple
  "BNBUSD", // Binance Coin
];

// Binance API URL
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

// Timeout for Binance API requests
const FETCH_TIMEOUT = 3000; // 3 seconds

// Add this to skip the route during static generation
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Convert our pairs to Binance format (e.g., BTCUSD -> BTCUSDT)
    const symbols = PAIRS.map(
      (pair) => pair.slice(0, -3).toUpperCase() + "USDT"
    );

    // Fetch prices for all symbols in parallel with timeout
    const responses = await Promise.all(
      symbols.map(async (symbol) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        try {
          const response = await fetch(`${BINANCE_API_URL}?symbol=${symbol}`, {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            // Add cache: 'no-store' to prevent caching
            cache: "no-store",
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            console.error(
              `Error fetching ${symbol}: ${response.status} ${response.statusText}`
            );
            return { symbol, price: "0", error: `HTTP ${response.status}` };
          }

          const data = await response.json();
          return { ...data, error: null };
        } catch (err) {
          clearTimeout(timeoutId);
          const error = err as Error;
          console.error(`Failed to fetch ${symbol}:`, error);
          return { symbol, price: "0", error: error.message };
        }
      })
    );

    // Format the data to match our expected format
    const prices = responses.map((item, index) => ({
      symbol: PAIRS[index],
      price: parseFloat(item.price) || 0,
      lastUpdated: new Date().toISOString(),
      error: item.error,
    }));

    // Check if all prices failed to fetch
    const allFailed = prices.every((price) => price.price === 0);
    if (allFailed) {
      throw new Error("Failed to fetch any valid prices");
    }

    // Return the formatted prices
    return successResponse({
      prices,
    });
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return errorFromException(error, ERROR_CODES.EXTERNAL_API_FAILED);
  }
}
