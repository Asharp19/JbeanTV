/**
 * Ticker Data Parser - Parse and transform WebSocket ticker messages
 */

import { parseFloatSafe } from "../utils/data-transformers";

export interface TickerData {
  pair: string;
  price: number;
  timestamp: number;
  volume: number;
  high24h?: number;
  low24h?: number;
  change24h?: number;
  changePercent24h?: number;
}

export interface RawTickerData {
  pair?: string;
  price?: string | number;
  last?: string | number;
  timestamp?: number;
  volume?: string | number;
  high24h?: string | number;
  low24h?: string | number;
  change24h?: string | number;
  changePercent24h?: string | number;
}

/**
 * Parse raw ticker data from WebSocket message
 */
export function parseTickerData(
  raw: RawTickerData,
  defaultPair: string
): TickerData {
  return {
    pair: raw.pair || defaultPair,
    price: parseFloatSafe(raw.price || raw.last, 0),
    timestamp: raw.timestamp || Date.now(),
    volume: parseFloatSafe(raw.volume, 0),
    high24h: raw.high24h ? parseFloatSafe(raw.high24h) : undefined,
    low24h: raw.low24h ? parseFloatSafe(raw.low24h) : undefined,
    change24h: raw.change24h ? parseFloatSafe(raw.change24h) : undefined,
    changePercent24h: raw.changePercent24h
      ? parseFloatSafe(raw.changePercent24h)
      : undefined,
  };
}

/**
 * Validate ticker data
 */
export function isValidTickerData(data: TickerData): boolean {
  return (
    typeof data.price === "number" &&
    data.price > 0 &&
    typeof data.timestamp === "number" &&
    typeof data.volume === "number"
  );
}

