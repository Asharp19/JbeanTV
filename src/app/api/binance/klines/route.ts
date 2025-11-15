import { NextRequest } from "next/server";
import {
  successResponse,
  errorFromException,
} from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";
import { validateQuery } from "@/lib/api/validate-request";
import { symbolQuerySchema } from "@/lib/validations/coinpair.schema";

// Circuit breaker state
const circuitBreaker = {
  failures: 0,
  lastFailureTime: 0,
  isOpen: false,
  threshold: 3, // Open circuit after 3 consecutive failures
  timeout: 30000, // Reset after 30 seconds
};

// Helper to check if circuit should reset
function shouldResetCircuit(): boolean {
  if (
    circuitBreaker.isOpen &&
    Date.now() - circuitBreaker.lastFailureTime > circuitBreaker.timeout
  ) {
    circuitBreaker.isOpen = false;
    circuitBreaker.failures = 0;
    return true;
  }
  return false;
}

// Helper to record failure
function recordFailure() {
  circuitBreaker.failures++;
  circuitBreaker.lastFailureTime = Date.now();
  if (circuitBreaker.failures >= circuitBreaker.threshold) {
    circuitBreaker.isOpen = true;
    console.warn(
      `Circuit breaker opened after ${circuitBreaker.failures} failures`
    );
  }
}

// Helper to record success
function recordSuccess() {
  circuitBreaker.failures = 0;
  circuitBreaker.isOpen = false;
}

// Fetch from backend with timeout
async function fetchFromBackend(
  url: string,
  timeoutMs: number = 5000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Fetch from Binance public API as fallback
async function fetchFromBinance(
  symbol: string,
  interval: string,
  startTime?: string,
  endTime?: string,
  limit?: string
): Promise<any[]> {
  const binanceUrl = new URL("https://api.binance.com/api/v3/klines");
  binanceUrl.searchParams.set("symbol", symbol);
  binanceUrl.searchParams.set("interval", interval);
  if (startTime) binanceUrl.searchParams.set("startTime", startTime);
  if (endTime) binanceUrl.searchParams.set("endTime", endTime);
  if (limit) binanceUrl.searchParams.set("limit", limit);

  const response = await fetch(binanceUrl.toString(), {
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Binance API responded with status: ${response.status}`);
  }

  return await response.json();
}

export async function GET(request: NextRequest) {
  try {
    // Validate query parameters
    const validation = validateQuery(request, symbolQuerySchema);
    if (!validation.success) {
      return validation.response;
    }

    const { symbol, interval, startTime, endTime, limit } = validation.data;

    // Check if circuit should reset
    shouldResetCircuit();

    let data: any;
    let source = "backend";

    // Try backend first if circuit is not open
    if (!circuitBreaker.isOpen && process.env.NEXT_PUBLIC_AGENCY_API) {
      try {
        // Build backend candle API URL
        let backendUrl = `${process.env.NEXT_PUBLIC_AGENCY_API}/api/candle/${symbol}?interval=${interval}`;
        if (startTime) backendUrl += `&startTime=${startTime}`;
        if (endTime) backendUrl += `&endTime=${endTime}`;
        if (limit) backendUrl += `&limit=${limit}`;

        const response = await fetchFromBackend(backendUrl);

        if (response.ok) {
          data = await response.json();
          recordSuccess();
        } else {
          throw new Error(
            `Backend API responded with status: ${response.status}`
          );
        }
      } catch (backendError: any) {
        console.warn(
          "Backend API failed, falling back to Binance:",
          backendError.message
        );
        recordFailure();
        // Fall through to Binance fallback
        data = null;
      }
    } else if (circuitBreaker.isOpen) {
      console.log("Circuit breaker is open, using Binance API directly");
    }

    // Fallback to Binance public API if backend failed or circuit is open
    if (!data) {
      source = "binance-fallback";
      data = await fetchFromBinance(
        symbol,
        interval as string,
        startTime || undefined,
        endTime || undefined,
        limit
      );
    }

    const response = successResponse({ data, source });
    response.headers.set("X-Data-Source", source);
    return response;
  } catch (error) {
    console.error("Error fetching candle data:", error);
    return errorFromException(error, ERROR_CODES.EXTERNAL_API_FAILED);
  }
}
