"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface BinanceContextType {
  prices: Record<string, number>;
  isConnected: boolean;
}

const BinanceContext = createContext<BinanceContextType>({
  prices: {},
  isConnected: false,
});

export const useBinanceData = () => useContext(BinanceContext);

interface BinanceProviderProps {
  symbols: string[];
  children: React.ReactNode;
}

export function BinanceProvider({ symbols, children }: BinanceProviderProps) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const RECONNECT_INTERVAL = 23 * 60 * 60 * 1000; // 23 hours in milliseconds

  const connectWebSocket = useCallback(() => {
    if (!symbols.length) return;

    if (wsRef.current) {
      wsRef.current.close(); // Close existing connection if any
    }

    const formattedSymbols = symbols.map((s) =>
      s.toLowerCase().replace("usd", "usdt")
    );

    const streamUrl = `wss://stream.binance.com:9443/stream?streams=${formattedSymbols
      .map((s) => `${s}@ticker`)
      .join("/")}`;

    wsRef.current = new WebSocket(streamUrl);

    wsRef.current.onopen = () => {
      console.log("Connected to Binance WebSocket");
      setIsConnected(true);
      setupPing();
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.data && message.data.s) {
        const symbol = message.data.s.replace("USDT", "USD");
        setPrices((prev) => ({
          ...prev,
          [symbol]: parseFloat(message.data.c),
        }));
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current.onclose = () => {
      console.log("Disconnected from Binance WebSocket");
      setIsConnected(false);
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };

    if (reconnectIntervalRef.current) {
      clearTimeout(reconnectIntervalRef.current);
    }

    reconnectIntervalRef.current = setTimeout(() => {
      console.log("Scheduled 23-hour reconnection to Binance WebSocket");
      connectWebSocket();
    }, RECONNECT_INTERVAL);
  }, [symbols]);

  const setupPing = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }
    pingIntervalRef.current = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ ping: Date.now() }));
      }
    }, 60000); // Send ping every minute
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectIntervalRef.current) {
        clearTimeout(reconnectIntervalRef.current);
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [symbols.join(","), connectWebSocket]);

  return (
    <BinanceContext.Provider value={{ prices, isConnected }}>
      {children}
    </BinanceContext.Provider>
  );
}
