import { useState, useEffect } from "react";

export function useHistoricalPredictions(coinPair: string) {
  const [historicalPredictions, setHistoricalPredictions] = useState([]);
  const [historicalLoading, setHistoricalLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchHistoricalPredictions = async () => {
      try {
        setHistoricalLoading(true);
        const response = await fetch(
          `/api/historical-predictions/${coinPair}`,
          {
            signal: abortController.signal,
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );

        // Check for response type and handle non-JSON responses
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response:", await response.text());
          setHistoricalLoading(false);
          return;
        }

        const data = await response.json();

        if (response.ok && data.success) {
          setHistoricalPredictions(
            Array.isArray(data.predictions) ? data.predictions : []
          );
        } else {
          console.error("Failed to fetch historical predictions:", data.error);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Historical predictions fetch aborted");
        } else {
          console.error("Error fetching historical predictions:", error);
        }
      } finally {
        setHistoricalLoading(false);
      }
    };

    // Fetch asynchronously without blocking render
    fetchHistoricalPredictions();

    return () => {
      abortController.abort();
    };
  }, [coinPair]);

  return { historicalPredictions, historicalLoading };
}

