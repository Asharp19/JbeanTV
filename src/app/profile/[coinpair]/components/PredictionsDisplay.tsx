"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { HistoricalDataTable } from "../../../agentconsensus/[coinpair]/components/HistoricalDataTable";

interface PredictionsDisplayProps {
  className?: string;
}

// Utility to get UTC midnight timestamp for a date
function getUTCMidnightTimestamp(date: Date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return d.getTime();
}

// Fetch OHLCV for a symbol and date from internal API (CORS-safe)
async function fetchActualPrices(symbol: string, date: Date) {
  const binanceSymbol = mapToBinanceSymbol(symbol);
  const startTime = getUTCMidnightTimestamp(date);
  const endTime = startTime + 24 * 60 * 60 * 1000 - 1; // End of the day
  const url = `/api/binance/klines?symbol=${binanceSymbol}&interval=1d&startTime=${startTime}&endTime=${endTime}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Use last_closed_candle or target_candle from backend response
    const candle = data.target_candle || data.last_closed_candle;
    if (candle && candle.high && candle.low && candle.close) {
      return {
        actualHigh: `$${parseFloat(candle.high).toLocaleString()}`,
        actualLow: `$${parseFloat(candle.low).toLocaleString()}`,
        actualClose: `$${parseFloat(candle.close).toLocaleString()}`,
      };
    }
  } catch (e) {
    // ignore
  }
  return {
    actualHigh: "$0.00",
    actualLow: "$0.00",
    actualClose: "$0.00",
  };
}

// Map app coin pairs to Binance symbols using regex
function mapToBinanceSymbol(symbol: string) {
  return symbol.replace(/USD$/, "USDT");
}

export const PredictionsDisplay: React.FC<PredictionsDisplayProps> = ({
  className,
}) => {
  const { data: session, status } = useSession();
  const params = useParams();
  const urlCoinpair = params.coinpair as string;
  const [predictions, setPredictions] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeCoinPair, setActiveCoinPair] = useState<string | null>(
    urlCoinpair || null
  );
  const [formattedPredictions, setFormattedPredictions] = useState<any[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setLoading(true);
          
          // Try fetching from user-predictions endpoint first (from predictions table)
          // This endpoint reads from the predictions table's CurrentPredictions and NextRoundPredictions
          const userEmail = encodeURIComponent(session.user.email);
          
          if (urlCoinpair) {
            // Fetch predictions for specific coin pair
            const url = `/api/user-predictions/${urlCoinpair}/${userEmail}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
              // Combine current and next predictions
              const allPredictions = [
                ...(data.current_predictions || []),
                ...(data.next_predictions || [])
              ];
              
              setPredictions({ [urlCoinpair]: allPredictions });
              setActiveCoinPair(urlCoinpair);
            } else {
              console.error("Failed to fetch predictions:", data.error);
            }
          } else {
            // Fetch all predictions across all coin pairs from predictions table
            const url = `/api/user-predictions/all/${userEmail}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
              const predictionsData = data.predictions || {};
              setPredictions(predictionsData);

              // Set active coin pair to the URL coinpair or the first one if there are predictions
              const pairs = Object.keys(predictionsData);
              if (pairs.length > 0 && !activeCoinPair) {
                setActiveCoinPair(urlCoinpair || pairs[0]);
              }
            } else {
              console.error("Failed to fetch predictions:", data.error || data.message);
            }
          }
        } catch (error) {
          console.error("Error fetching predictions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPredictions();
  }, [status, urlCoinpair, session?.user?.email]);

  // When URL coinpair changes, update active coinpair
  useEffect(() => {
    if (urlCoinpair) {
      setActiveCoinPair(urlCoinpair);
    }
  }, [urlCoinpair]);

  // Format predictions data for the HistoricalDataTable component
  useEffect(() => {
    let ignore = false;
    const cache = new Map<string, any>();
    async function formatWithActuals() {
      if (predictions && activeCoinPair && predictions[activeCoinPair]) {
        // Deduplicate by target date (keep most recent timestamp)
        const seen = new Map<string, any>();
        predictions[activeCoinPair].forEach((pred: any) => {
          const dateObj = new Date(pred.timestamp || "");
          const targetDate = new Date(dateObj);
          targetDate.setDate(targetDate.getDate() + 1);
          const key = targetDate.toISOString().slice(0, 10);
          if (!seen.has(key)) {
            seen.set(key, pred);
          } else {
            const existing = seen.get(key);
            if (
              pred.timestamp &&
              (!existing.timestamp ||
                new Date(pred.timestamp) > new Date(existing.timestamp))
            ) {
              seen.set(key, pred);
            }
          }
        });
        const deduped = Array.from(seen.values());
        const formatted = await Promise.all(
          deduped.map(async (pred: any) => {
            // Extract data from the timestamp value
            const timestamp = pred.timestamp || "";
            const dateObj = new Date(timestamp);
            const formattedDate = dateObj.toLocaleDateString();

            // Calculate target date (assume next day)
            const targetDate = new Date(dateObj);
            targetDate.setDate(targetDate.getDate() + 1);
            const formattedTarget = targetDate.toLocaleDateString();

            // Fetch actuals (cache by symbol+date)
            const cacheKey = `${activeCoinPair}_${targetDate
              .toISOString()
              .slice(0, 10)}`;
            let actuals = cache.get(cacheKey);
            if (!actuals) {
              actuals = await fetchActualPrices(activeCoinPair, targetDate);
              cache.set(cacheKey, actuals);
            }

            return {
              date: formattedDate,
              target: formattedTarget,
              predictedHigh: `$${pred.high?.toLocaleString() || "0.00"}`,
              predictedLow: `$${pred.low?.toLocaleString() || "0.00"}`,
              predictedClose: `$${pred.close?.toLocaleString() || "0.00"}`,
              predictedPrice: `$${pred.close?.toLocaleString() || "0.00"}`,
              rawPredictedHigh: pred.high || 0,
              rawPredictedLow: pred.low || 0,
              rawPredictedClose: pred.close || 0,
              rawDate: timestamp,
              status: "Pending", // Default status
              // Add raw actual values for chart
              rawActualHigh: actuals.actualHigh
                ? parseFloat(actuals.actualHigh.replace(/[$,]/g, ""))
                : undefined,
              rawActualLow: actuals.actualLow
                ? parseFloat(actuals.actualLow.replace(/[$,]/g, ""))
                : undefined,
              rawActualClose: actuals.actualClose
                ? parseFloat(actuals.actualClose.replace(/[$,]/g, ""))
                : undefined,
              // Calculate accuracy percentage
              accuracyPercent:
                actuals.actualClose &&
                pred.close &&
                actuals.actualClose !== "$0.00"
                  ? (
                      Math.abs(
                        (parseFloat(actuals.actualClose.replace(/[$,]/g, "")) -
                          pred.close) /
                          pred.close
                      ) * 100
                    ).toFixed(2)
                  : null,
              ...actuals,
            };
          })
        );
        if (!ignore)
          setFormattedPredictions(
            formatted.sort(
              (a, b) =>
                new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
            )
          );
      } else {
        setFormattedPredictions([]);
      }
    }
    formatWithActuals();
    return () => {
      ignore = true;
    };
  }, [predictions, activeCoinPair]);

  // Handle coin pair selection
  const handleCoinPairChange = (pair: string) => {
    setActiveCoinPair(pair);
    // Navigate to the corresponding URL if different from current coinpair
    if (pair !== urlCoinpair) {
      window.location.href = `/profile/${pair}`;
    }
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-[500px] bg-gradient-to-b from-background-secondary/40 to-background-secondary/60 backdrop-blur-xl rounded-3xl shadow-lg ${className}`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  if (Object.keys(predictions).length === 0) {
    return (
      <div
        className={`bg-gradient-to-b from-background-secondary/50 to-background-secondary/70 backdrop-blur-xl rounded-3xl p-8 border border-content-quaternary shadow-lg ${className}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-content-primary flex items-center">
          <span className="mr-2">📊</span> My Predictions
        </h2>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-16 h-16 mb-4 rounded-full bg-background-tertiary/70 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-content-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-content-secondary text-lg mb-2">
            You haven&apos;t made any predictions yet.
          </p>
          <p className="text-content-tertiary text-sm">
            Start predicting crypto prices to see your history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-b from-background-secondary/50 to-background-secondary/70 backdrop-blur-xl rounded-3xl shadow-xl border border-content-quaternary overflow-hidden ${className}`}
    >
      <div className="p-8 pb-4">
        <h2 className="text-2xl font-bold mb-6 text-content-primary flex items-center">
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="40"
              height="40"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <g
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 87.994 0 H 69.342 c -1.787 0 -2.682 2.16 -1.418 3.424 l 5.795 5.795 l -33.82 33.82 L 28.056 31.196 l -3.174 -3.174 c -1.074 -1.074 -2.815 -1.074 -3.889 0 L 0.805 48.209 c -1.074 1.074 -1.074 2.815 0 3.889 l 3.174 3.174 c 1.074 1.074 2.815 1.074 3.889 0 l 15.069 -15.069 l 14.994 14.994 c 1.074 1.074 2.815 1.074 3.889 0 l 1.614 -1.614 c 0.083 -0.066 0.17 -0.125 0.247 -0.202 l 37.1 -37.1 l 5.795 5.795 C 87.84 23.34 90 22.445 90 20.658 V 2.006 C 90 0.898 89.102 0 87.994 0 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(255, 255, 255)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  strokeLinecap="round"
                />
                <path
                  d="M 65.626 37.8 v 49.45 c 0 1.519 1.231 2.75 2.75 2.75 h 8.782 c 1.519 0 2.75 -1.231 2.75 -2.75 V 23.518 L 65.626 37.8 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(221, 217, 217)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 47.115 56.312 V 87.25 c 0 1.519 1.231 2.75 2.75 2.75 h 8.782 c 1.519 0 2.75 -1.231 2.75 -2.75 V 42.03 L 47.115 56.312 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(207, 207, 207)",
                    fillRule: "nonzero",
                  }}
                  strokeLinecap="round"
                />
                <path
                  d="M 39.876 60.503 c -1.937 0 -3.757 -0.754 -5.127 -2.124 l -6.146 -6.145 V 87.25 c 0 1.519 1.231 2.75 2.75 2.75 h 8.782 c 1.519 0 2.75 -1.231 2.75 -2.75 V 59.844 C 41.952 60.271 40.933 60.503 39.876 60.503 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(150, 148, 148)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  strokeLinecap="round"
                />
                <path
                  d="M 22.937 46.567 L 11.051 58.453 c -0.298 0.298 -0.621 0.562 -0.959 0.8 V 87.25 c 0 1.519 1.231 2.75 2.75 2.75 h 8.782 c 1.519 0 2.75 -1.231 2.75 -2.75 V 48.004 L 22.937 46.567 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(0,0,0)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </span>{" "}
          My Predictions
        </h2>

        <div className="flex mb-6 gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-background-tertiary scrollbar-track-transparent">
          {Object.keys(predictions).map((pair) => (
            <button
              key={pair}
              onClick={() => handleCoinPairChange(pair)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeCoinPair === pair
                  ? "bg-accent-primary text-white shadow-md shadow-accent-primary/20"
                  : "bg-background-tertiary/80 text-content-secondary hover:bg-background-tertiary hover:text-content-primary"
              }`}
            >
              {pair}
            </button>
          ))}
        </div>
      </div>

      {activeCoinPair && (
        <div className="mx-4 mb-6 bg-background-tertiary/30 rounded-2xl p-4 shadow-inner">
          <div className="h-[650px]">
            <HistoricalDataTable
              predictions={formattedPredictions}
              activeTab="ai"
              symbol={activeCoinPair}
            />
          </div>
        </div>
      )}
    </div>
  );
};
