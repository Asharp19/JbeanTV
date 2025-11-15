import { useState, useEffect } from "react";
import type { PairPrice } from "@/types/predictions";

// Define the API endpoint for our server-side proxy
const API_ENDPOINT = "/api/crypto-prices";

// Constants for retry logic
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export function useCryptoPrices() {
  const [prices, setPrices] = useState<PairPrice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let intervalId: NodeJS.Timeout;
    let isMounted = true;

    const fetchPrices = async (retryCount = 0) => {
      try {
        if (!isMounted) return;
        
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        try {
          const response = await fetch(API_ENDPOINT, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            }
          });

          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (isMounted) {
            setPrices(data.prices);
            setError(null);
          }
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      } catch (err) {
        console.error("Failed to fetch prices:", err);
        if (isMounted) {
          if (retryCount < MAX_RETRIES) {
            // Retry after delay
            setTimeout(() => fetchPrices(retryCount + 1), RETRY_DELAY);
          } else {
            setError("Failed to fetch price data");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Only fetch on client side
    if (mounted) {
      // Fetch immediately
      fetchPrices();

      // Then fetch every minute
      intervalId = setInterval(() => fetchPrices(), 60000);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mounted]);

  return { prices, error, loading };
}
