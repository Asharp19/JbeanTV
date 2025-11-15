/**
 * Utility functions for profile components
 */

/**
 * Format date for display in standard format
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  // Format date as: "Month Day, Year, HH:MM AM/PM"
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Export formatDisplayTargetDate from shared utils
export { formatDisplayTargetDate } from "@/lib/utils";

/**
 * Calculate prediction accuracy based on current price
 */
export function calculateAccuracy(
  predictedPrice: number,
  currentPrice: number
): number {
  if (!currentPrice || !predictedPrice) return 0;

  const priceDifference = Math.abs(predictedPrice - currentPrice);
  return Math.max(0, 100 - (priceDifference / predictedPrice) * 100);
}
