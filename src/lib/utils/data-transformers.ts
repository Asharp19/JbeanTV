/**
 * Data transformation utilities
 */

/**
 * Transform Binance symbol format (e.g., "BTCUSD" -> "BTCUSDT")
 */
export function formatBinanceSymbol(symbol: string): string {
  return symbol.replace(/USD$/, "USDT");
}

/**
 * Transform pair to Binance format (e.g., "BTC/USDT" -> "BTCUSDT")
 */
export function pairToSymbol(pair: string): string {
  return pair.replace("/", "");
}

/**
 * Transform symbol to pair format (e.g., "BTCUSDT" -> "BTC/USDT")
 */
export function symbolToPair(symbol: string): string {
  return symbol.replace(/USDT$/, "/USDT");
}

/**
 * Parse float with fallback
 */
export function parseFloatSafe(value: any, fallback: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Safely parse JSON with fallback
 */
export function parseJsonSafe<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(
  predicted: number,
  actual: number
): number {
  const difference = Math.abs(predicted - actual);
  return Math.max(0, 100 - (difference / predicted) * 100);
}

/**
 * Format date to UTC components
 */
export function getUtcDateComponents(date: Date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}

/**
 * Create UTC date from components
 */
export function createUtcDate(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): Date {
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

