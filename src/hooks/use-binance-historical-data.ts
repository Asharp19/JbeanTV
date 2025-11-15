import { useState, useEffect } from "react";
import { useTickerContext } from "@/contexts/TickerContext";

interface HistoricalPriceData {
  date: string;
  high: number;
  low: number;
  close: number;
}

export function useBinanceHistoricalData(symbol: string, dates: string[]) {
  const [priceData, setPriceData] = useState<
    Record<string, HistoricalPriceData>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentPair } = useTickerContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchHistoricalData = async () => {
      setLoading(true);

      try {
        const results: Record<string, HistoricalPriceData> = {};

        // Format symbol for Binance API (e.g. "BTCUSD" to "BTCUSDT")
        const binanceSymbol = symbol.replace("USD", "USDT");

        // Create fetch promises for all dates in parallel
        const fetchPromises = dates.map(async (date) => {
          const targetDate = new Date(date);

          // Skip future dates
          if (targetDate > new Date()) return { date, data: null };

          // Get target date in UTC to avoid timezone issues
          const targetYear = targetDate.getUTCFullYear();
          const targetMonth = targetDate.getUTCMonth(); // 0-indexed
          const targetDay = targetDate.getUTCDate();

          // Create start/end dates to ensure we get the correct day's data
          // Start from 00:00:00 UTC of the target day
          const startDate = new Date(
            Date.UTC(targetYear, targetMonth, targetDay, 0, 0, 0)
          );
          // End at 23:59:59 UTC of the target day
          const endDate = new Date(
            Date.UTC(targetYear, targetMonth, targetDay, 23, 59, 59)
          );

          // Convert to timestamps
          const startTime = startDate.getTime();
          const endTime = endDate.getTime();

          // Create timeout for this request
          const timeoutId = setTimeout(() => abortController.abort(), 10000);

          try {
            // Fetch daily candles for the exact date
            const response = await fetch(
              `/api/binance/klines?symbol=${binanceSymbol}&interval=1d&startTime=${startTime}&endTime=${endTime}`,
              { signal: abortController.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
              console.warn(`Failed to fetch data for ${date}: ${response.status}`);
              return { date, data: null };
            }

            const data = await response.json();

            if (data && data.length > 0) {
              // Use the candle that most closely matches our target date
              const candle = data[0];
              const [
                openTime,
                open,
                high,
                low,
                close,
                volume,
                closeTime,
                /* other fields we don't need */
              ] = candle;

              return {
                date,
                data: {
                  date: new Date(closeTime).toISOString(),
                  high: parseFloat(high),
                  low: parseFloat(low),
                  close: parseFloat(close),
                },
              };
            } else {
              console.warn(`No price data found for ${date}`);
              return { date, data: null };
            }
          } catch (err) {
            clearTimeout(timeoutId);
            if (err instanceof Error && err.name === "AbortError") {
              console.warn(`Request aborted for ${date}`);
            } else {
              console.warn(`Error fetching data for ${date}:`, err);
            }
            return { date, data: null };
          }
        });

        // Execute all fetches in parallel with a global timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Overall fetch timeout")), 10000)
        );

        const settledResults = await Promise.race([
          Promise.allSettled(fetchPromises),
          timeoutPromise,
        ]).catch(() => {
          // If timeout, return whatever we have so far
          return [];
        });

        // Process results
        if (Array.isArray(settledResults)) {
          settledResults.forEach((result) => {
            if (result.status === "fulfilled" && result.value.data) {
              results[result.value.date] = result.value.data;
            }
          });
        }

        setPriceData(results);
        setError(null);
      } catch (err) {
        console.error("Error fetching Binance historical data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (dates.length > 0) {
      fetchHistoricalData();
    } else {
      setLoading(false);
    }

    // Cleanup function to abort requests on unmount
    return () => {
      abortController.abort();
    };
  }, [symbol, dates]);

  return { priceData, loading, error };
}
