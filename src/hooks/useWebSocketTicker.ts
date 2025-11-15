import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Interface for ticker data received from WebSocket
 */
interface TickerData {
  pair: string;
  price: number;
  timestamp: number;
  volume: number;
  high24h?: number;
  low24h?: number;
  change24h?: number;
  changePercent24h?: number;
}

/**
 * Hook options
 */
interface UseWebSocketTickerOptions {
  /**
   * Automatically reconnect on connection close or error
   * @default true
   */
  autoReconnect?: boolean;

  /**
   * Reconnection delay in milliseconds
   * @default 3000
   */
  reconnectDelay?: number;

  /**
   * Maximum number of reconnection attempts
   * @default 5
   */
  maxReconnectAttempts?: number;
}

/**
 * Custom hook for real-time WebSocket ticker data
 *
 * @param pair - Trading pair (e.g., "BTC/USDT")
 * @param options - Configuration options
 * @returns Object containing ticker data, connection status, and error information
 */
export function useWebSocketTicker(
  pair: string,
  options: UseWebSocketTickerOptions = {}
) {
  // Default options
  const {
    autoReconnect = true,
    reconnectDelay = 3000,
    maxReconnectAttempts = 5,
  } = options;

  // State for ticker data and connection status
  const [tickerData, setTickerData] = useState<TickerData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reconnectCount, setReconnectCount] = useState<number>(0);

  // Refs to maintain WebSocket instance and mounted state
  const wsRef = useRef<WebSocket | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Cleanup function to close WebSocket connection
  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    // Clean up any existing connection
    cleanup();

    // Reset error state
    setError(null);

    // Get the API base URL from environment variable
    const apiBaseUrl = process.env.NEXT_PUBLIC_AGENCY_API || "";

    // Convert http/https to ws/wss
    const wsBaseUrl = apiBaseUrl.replace(/^http/, "ws");

    // Create WebSocket URL
    const wsUrl = `${wsBaseUrl}/ws/ticker-query?pair=${encodeURIComponent(
      pair
    )}`;

    try {
      // Create new WebSocket connection
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // Connection opened
      ws.onopen = () => {
        if (isMountedRef.current) {
          console.log(`WebSocket connected for ${pair}`);
          setIsConnected(true);
          setReconnectCount(0);
        }
      };

      // Listen for messages
      ws.onmessage = (event) => {
        if (isMountedRef.current) {
          try {
            const data = JSON.parse(event.data);
            setTickerData({
              pair: data.pair || pair,
              price: parseFloat(data.price || data.last || "0"),
              timestamp: data.timestamp || Date.now(),
              volume: parseFloat(data.volume || "0"),
              high24h: data.high24h ? parseFloat(data.high24h) : undefined,
              low24h: data.low24h ? parseFloat(data.low24h) : undefined,
              change24h: data.change24h
                ? parseFloat(data.change24h)
                : undefined,
              changePercent24h: data.changePercent24h
                ? parseFloat(data.changePercent24h)
                : undefined,
            });
          } catch (err) {
            console.error("Error parsing WebSocket data:", err);
          }
        }
      };

      // Handle errors
      ws.onerror = (event) => {
        if (isMountedRef.current) {
          console.error("WebSocket error:", event);
          setError(new Error("WebSocket connection error"));
        }
      };

      // Connection closed
      ws.onclose = (event) => {
        if (isMountedRef.current) {
          console.log(
            `WebSocket disconnected for ${pair}:`,
            event.code,
            event.reason
          );
          setIsConnected(false);

          // Attempt to reconnect if enabled
          if (autoReconnect && reconnectCount < maxReconnectAttempts) {
            console.log(
              `Attempting to reconnect (${
                reconnectCount + 1
              }/${maxReconnectAttempts})...`
            );
            setTimeout(() => {
              if (isMountedRef.current) {
                setReconnectCount((prev) => prev + 1);
                connect();
              }
            }, reconnectDelay);
          }
        }
      };
    } catch (err) {
      if (isMountedRef.current) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to create WebSocket connection");
        console.error("WebSocket connection error:", error);
        setError(error);
      }
    }
  }, [pair, autoReconnect, reconnectDelay, maxReconnectAttempts, cleanup]);

  // Initialize WebSocket connection
  useEffect(() => {
    // Set mounted flag
    isMountedRef.current = true;

    // Connect to WebSocket
    connect();

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [pair, connect, cleanup]);

  // Return ticker data and connection status
  return {
    data: tickerData,
    isConnected,
    error,
    reconnect: connect,
    reconnectCount,
  };
}

/**
 * Hook for subscribing to multiple ticker pairs
 *
 * @param pairs - Array of trading pairs (e.g., ["BTC/USDT", "ETH/USDT"])
 * @param options - Configuration options
 * @returns Object containing ticker data for all pairs
 */
export function useMultiWebSocketTicker(
  pairs: string[],
  options: UseWebSocketTickerOptions = {}
) {
  // State for all ticker data
  const [tickersData, setTickersData] = useState<
    Record<string, TickerData | null>
  >({});
  const [isAllConnected, setIsAllConnected] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, Error | null>>({});

  // Initialize with empty data for all pairs
  useEffect(() => {
    const initialData: Record<string, TickerData | null> = {};
    const initialErrors: Record<string, Error | null> = {};

    pairs.forEach((pair) => {
      if (!tickersData[pair]) {
        initialData[pair] = null;
        initialErrors[pair] = null;
      }
    });

    setTickersData((prev) => ({ ...prev, ...initialData }));
    setErrors((prev) => ({ ...prev, ...initialErrors }));
  }, [pairs]);

  // Create a WebSocket connection for each pair
  useEffect(() => {
    const connections: Record<
      string,
      {
        ws: WebSocket;
        cleanup: () => void;
      }
    > = {};

    // Get the API base URL from environment variable
    const apiBaseUrl = process.env.NEXT_PUBLIC_AGENCY_API || "";

    // Convert http/https to ws/wss
    const wsBaseUrl = apiBaseUrl.replace(/^http/, "ws");

    // Connect to each pair
    pairs.forEach((pair) => {
      // Create WebSocket URL
      const wsUrl = `${wsBaseUrl}/ws/ticker-query?pair=${encodeURIComponent(
        pair
      )}`;

      try {
        // Create new WebSocket connection
        const ws = new WebSocket(wsUrl);

        // Connection opened
        ws.onopen = () => {
          console.log(`WebSocket connected for ${pair}`);
          setTickersData((prev) => ({
            ...prev,
            [pair]: prev[pair] || null,
          }));
          setErrors((prev) => ({
            ...prev,
            [pair]: null,
          }));

          // Check if all connections are established
          checkAllConnections();
        };

        // Listen for messages
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setTickersData((prev) => ({
              ...prev,
              [pair]: {
                pair: data.pair || pair,
                price: parseFloat(data.price || data.last || "0"),
                timestamp: data.timestamp || Date.now(),
                volume: parseFloat(data.volume || "0"),
                high24h: data.high24h ? parseFloat(data.high24h) : undefined,
                low24h: data.low24h ? parseFloat(data.low24h) : undefined,
                change24h: data.change24h
                  ? parseFloat(data.change24h)
                  : undefined,
                changePercent24h: data.changePercent24h
                  ? parseFloat(data.changePercent24h)
                  : undefined,
              },
            }));
          } catch (err) {
            console.error(`Error parsing WebSocket data for ${pair}:`, err);
          }
        };

        // Handle errors
        ws.onerror = (event) => {
          console.error(`WebSocket error for ${pair}:`, event);
          setErrors((prev) => ({
            ...prev,
            [pair]: new Error(`WebSocket connection error for ${pair}`),
          }));
        };

        // Connection closed
        ws.onclose = (event) => {
          console.log(
            `WebSocket disconnected for ${pair}:`,
            event.code,
            event.reason
          );

          // Attempt to reconnect if enabled
          if (options.autoReconnect !== false) {
            setTimeout(() => {
              // Reconnect logic would go here
            }, options.reconnectDelay || 3000);
          }

          // Check if all connections are established
          checkAllConnections();
        };

        // Store connection
        connections[pair] = {
          ws,
          cleanup: () => {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onerror = null;
            ws.onclose = null;
            ws.close();
          },
        };
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error(`Failed to create WebSocket connection for ${pair}`);
        console.error(`WebSocket connection error for ${pair}:`, error);
        setErrors((prev) => ({
          ...prev,
          [pair]: error,
        }));
      }
    });

    // Function to check if all connections are established
    function checkAllConnections() {
      const allConnected = pairs.every(
        (pair) => connections[pair]?.ws.readyState === WebSocket.OPEN
      );
      setIsAllConnected(allConnected);
    }

    // Cleanup on unmount
    return () => {
      Object.values(connections).forEach((connection) => {
        connection.cleanup();
      });
    };
  }, [pairs.join(",")]);

  // Return ticker data for all pairs
  return {
    data: tickersData,
    isAllConnected,
    errors,
  };
}
