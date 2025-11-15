/**
 * Validation Service - Business rule validation
 */

export class ValidationService {
  /**
   * Validate prediction data business rules
   */
  validatePrediction(data: {
    high: number;
    low: number;
    close: number;
    currentPrice: number;
  }): { valid: boolean; error?: string } {
    const { high, low, close, currentPrice } = data;

    // Check if low <= close <= high
    if (low > high) {
      return { valid: false, error: "Low price cannot be greater than high price" };
    }

    if (close < low || close > high) {
      return {
        valid: false,
        error: "Close price must be between low and high price",
      };
    }

    // Check for reasonable variance from current price (e.g., within 50%)
    const maxVariance = currentPrice * 0.5;
    if (Math.abs(close - currentPrice) > maxVariance) {
      return {
        valid: false,
        error: "Prediction is too far from current price (max 50% variance)",
      };
    }

    // Check all values are positive
    if (high <= 0 || low <= 0 || close <= 0) {
      return { valid: false, error: "All prices must be positive" };
    }

    return { valid: true };
  }

  /**
   * Validate target date
   */
  validateTargetDate(targetDate: string): { valid: boolean; error?: string } {
    const target = new Date(targetDate);
    const now = new Date();

    if (isNaN(target.getTime())) {
      return { valid: false, error: "Invalid date format" };
    }

    if (target <= now) {
      return { valid: false, error: "Target date must be in the future" };
    }

    // Check if target date is within reasonable range (e.g., max 30 days)
    const maxDays = 30;
    const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
    if (target > maxDate) {
      return {
        valid: false,
        error: `Target date cannot be more than ${maxDays} days in the future`,
      };
    }

    return { valid: true };
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate coinpair format
   */
  validateCoinPair(coinpair: string): boolean {
    const validPairs = ["BTCUSD", "ETHUSD", "SOLUSD", "AVAXUSD", "XRPUSD", "BNBUSD"];
    return validPairs.includes(coinpair.toUpperCase());
  }
}

export const validationService = new ValidationService();

