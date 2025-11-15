/**
 * Binance Service - Handles Binance API interactions
 */

import { fetchJson } from "./api-client";
import { API_ENDPOINTS } from "../api/endpoints";
import {
  formatBinanceSymbol,
  getUtcDateComponents,
  createUtcDate,
  parseFloatSafe,
} from "../utils/data-transformers";

export interface HistoricalPriceData {
  date: string;
  high: number;
  low: number;
  close: number;
}

// Binance kline data is returned as an array, not an object
// [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume, unused]
export type BinanceKline = [
  number,  // 0: openTime
  string,  // 1: open
  string,  // 2: high
  string,  // 3: low
  string,  // 4: close
  string,  // 5: volume
  number,  // 6: closeTime
  string,  // 7: quoteAssetVolume
  number,  // 8: numberOfTrades
  string,  // 9: takerBuyBaseAssetVolume
  string,  // 10: takerBuyQuoteAssetVolume
  string   // 11: unused
];

/**
 * Fetch historical price data for specific dates
 */
export async function fetchHistoricalPrices(
  symbol: string,
  dates: string[]
): Promise<Record<string, HistoricalPriceData>> {
  const results: Record<string, HistoricalPriceData> = {};
  const binanceSymbol = formatBinanceSymbol(symbol);

  for (const date of dates) {
    const targetDate = new Date(date);

    if (targetDate > new Date()) continue;

    const { year, month, day } = getUtcDateComponents(targetDate);
    const startDate = createUtcDate(year, month, day, 0, 0, 0);
    const endDate = createUtcDate(year, month, day, 23, 59, 59);

    try {
      const data = await fetchKlines(
        binanceSymbol,
        "1d",
        startDate.getTime(),
        endDate.getTime()
      );

      if (data && data.length > 0) {
        const candle = data[0];
        results[date] = parseKlineToHistoricalData(candle);
        console.log(
          `Found price data for ${targetDate.toISOString()}: ${candle[4]}`
        );
      } else {
        console.warn(`No price data found for ${targetDate.toISOString()}`);
        const fallbackData = await fetchFallbackPrice(
          binanceSymbol,
          targetDate
        );
        if (fallbackData) {
          results[date] = fallbackData;
        }
      }
    } catch (error) {
      console.error(`Error fetching data for ${date}:`, error);
    }
  }

  return results;
}

/**
 * Fetch Binance klines data
 */
async function fetchKlines(
  symbol: string,
  interval: string,
  startTime: number,
  endTime: number
): Promise<BinanceKline[]> {
  const url = API_ENDPOINTS.binance.klines({
    symbol,
    interval,
    startTime,
    endTime,
  });

  return fetchJson<BinanceKline[]>(url);
}

/**
 * Fetch fallback price data with wider date range
 */
async function fetchFallbackPrice(
  symbol: string,
  targetDate: Date
): Promise<HistoricalPriceData | null> {
  const fallbackStart = new Date(targetDate);
  fallbackStart.setDate(fallbackStart.getDate() - 3);

  const fallbackEnd = new Date(targetDate);
  fallbackEnd.setDate(fallbackEnd.getDate() + 3);

  try {
    const fallbackData = await fetchKlines(
      symbol,
      "1d",
      fallbackStart.getTime(),
      fallbackEnd.getTime()
    );

    if (fallbackData && fallbackData.length > 0) {
      const closestCandle = findClosestCandle(fallbackData, targetDate);
      console.log(
        `Found fallback price data for ${targetDate.toISOString()}: ${closestCandle[4]}`
      );
      return parseKlineToHistoricalData(closestCandle);
    }
  } catch (error) {
    console.error("Error fetching fallback data:", error);
  }

  return null;
}

/**
 * Find the closest candle to target date
 */
function findClosestCandle(
  candles: BinanceKline[],
  targetDate: Date
): BinanceKline {
  let closestCandle = candles[0];
  let smallestDiff = Math.abs(targetDate.getTime() - closestCandle[0]);

  for (const candle of candles) {
    const diff = Math.abs(targetDate.getTime() - candle[0]);
    if (diff < smallestDiff) {
      closestCandle = candle;
      smallestDiff = diff;
    }
  }

  return closestCandle;
}

/**
 * Parse Binance kline to historical data format
 */
function parseKlineToHistoricalData(
  candle: BinanceKline
): HistoricalPriceData {
  return {
    date: new Date(candle[6]).toISOString(),
    high: parseFloatSafe(candle[2]),
    low: parseFloatSafe(candle[3]),
    close: parseFloatSafe(candle[4]),
  };
}

