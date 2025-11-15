/**
 * Calculation Service - Business logic calculations
 */

export class CalculationService {
  /**
   * Calculate prediction accuracy
   */
  calculateAccuracy(predicted: number, actual: number): number {
    if (actual === 0) return 0;
    
    const difference = Math.abs(predicted - actual);
    const accuracy = Math.max(0, 100 - (difference / actual) * 100);
    return Math.round(accuracy * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Calculate percent difference
   */
  calculatePercentDifference(value1: number, value2: number): number {
    if (value2 === 0) return 0;
    
    const diff = ((value1 - value2) / value2) * 100;
    return Math.round(diff * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Calculate price change
   */
  calculatePriceChange(currentPrice: number, previousPrice: number): {
    change: number;
    changePercent: number;
  } {
    const change = currentPrice - previousPrice;
    const changePercent =
      previousPrice !== 0 ? (change / previousPrice) * 100 : 0;
    
    return {
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
    };
  }

  /**
   * Calculate average price
   */
  calculateAverage(prices: number[]): number {
    if (prices.length === 0) return 0;
    
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return Math.round((sum / prices.length) * 100) / 100;
  }

  /**
   * Calculate volatility (standard deviation)
   */
  calculateVolatility(prices: number[]): number {
    if (prices.length === 0) return 0;
    
    const avg = this.calculateAverage(prices);
    const squaredDiffs = prices.map((price) => Math.pow(price - avg, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / prices.length;
    return Math.round(Math.sqrt(variance) * 100) / 100;
  }

  /**
   * Format price for display
   */
  formatPrice(price: number, decimals: number = 2): string {
    return price.toFixed(decimals);
  }

  /**
   * Calculate reward distribution
   */
  calculateReward(accuracy: number, totalPool: number, rank: number): number {
    // Simple reward calculation - can be made more complex
    const baseReward = totalPool / 100; // 1% of pool
    const accuracyMultiplier = accuracy / 100;
    const rankMultiplier = Math.max(0, 1 - rank / 100); // Decreases with rank
    
    return Math.round(baseReward * accuracyMultiplier * rankMultiplier * 100) / 100;
  }
}

export const calculationService = new CalculationService();

