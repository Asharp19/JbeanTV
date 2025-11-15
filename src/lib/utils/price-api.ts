/**
 * Utility functions for fetching cryptocurrency price data
 */

/**
 * Fetch current price for a trading pair from Binance
 * @param symbol Trading pair (e.g., "BTCUSD")
 * @returns Promise with the current price
 */
export async function fetchCurrentPrice(symbol: string): Promise<number> {
  try {
    // Convert to Binance format (e.g., BTCUSD -> BTCUSDT)
    const binanceSymbol = symbol.replace("USD", "USDT");

    // Fetch from Binance public API
    const response = await fetch(
      `https://data-api.binance.vision/api/v3/ticker/price?symbol=${binanceSymbol}`
    );

    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}`);
    }

    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw error;
  }
}

/**
 * Fetch 24hr stats for a trading pair from Binance
 * @param symbol Trading pair (e.g., "BTCUSD")
 * @returns Promise with 24hr stats including high and low
 */
export async function fetch24hrStats(symbol: string): Promise<{
  highPrice: number;
  lowPrice: number;
  priceChangePercent: number;
  volume: number;
}> {
  try {
    // Convert to Binance format
    const binanceSymbol = symbol.replace("USD", "USDT");

    // Fetch from Binance public API
    const response = await fetch(
      `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=${binanceSymbol}`
    );

    if (!response.ok) {
      throw new Error(`Binance API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      highPrice: parseFloat(data.highPrice),
      lowPrice: parseFloat(data.lowPrice),
      priceChangePercent: parseFloat(data.priceChangePercent),
      volume: parseFloat(data.volume),
    };
  } catch (error) {
    console.error(`Error fetching 24hr stats for ${symbol}:`, error);
    throw error;
  }
}
