/**
 * Validation utilities
 */

/**
 * Validate coin pair format (e.g., "BTCUSD")
 */
export function isValidCoinPair(coinPair: string): boolean {
  return /^([A-Z]+)USD$/.test(coinPair);
}

/**
 * Validate trading pair format (e.g., "BTC/USDT")
 */
export function isValidTradingPair(pair: string): boolean {
  return /^[A-Z]+\/[A-Z]+$/.test(pair);
}

/**
 * Validate price value
 */
export function isValidPrice(price: number): boolean {
  return typeof price === "number" && price > 0 && !isNaN(price);
}

/**
 * Validate date string
 */
export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Validate future date
 */
export function isFutureDate(date: Date | string): boolean {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  return targetDate > new Date();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate wallet address format
 */
export function isValidWalletAddress(address: string): boolean {
  // Basic validation - can be extended for specific blockchain formats
  return typeof address === "string" && address.length >= 26;
}

/**
 * Check if content type is JSON
 */
export function isJsonContentType(contentType: string | null): boolean {
  return contentType !== null && contentType.includes("application/json");
}

