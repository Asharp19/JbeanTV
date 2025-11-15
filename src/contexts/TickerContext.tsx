"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import {
  useWebSocketTicker,
  useMultiWebSocketTicker,
} from "@/hooks/useWebSocketTicker";

// Define the ticker data interface
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

// Define the context interface
interface TickerContextType {
  // Single pair data
  currentPair: string;
  setCurrentPair: (pair: string) => void;
  tickerData: TickerData | null;
  isConnected: boolean;
  error: Error | null;
  reconnect: () => void;

  // Multiple pairs data
  watchedPairs: string[];
  addPair: (pair: string) => void;
  removePair: (pair: string) => void;
  allTickersData: Record<string, TickerData | null>;
  isAllConnected: boolean;
  errors: Record<string, Error | null>;
}

// Create the context with a default value
const TickerContext = createContext<TickerContextType | undefined>(undefined);

// Provider props interface
interface TickerProviderProps {
  children: ReactNode;
  defaultPair?: string;
  defaultWatchedPairs?: string[];
}

/**
 * Provider component for WebSocket ticker data
 */
export function TickerProvider({
  children,
  defaultPair = "BTC/USDT",
  defaultWatchedPairs = ["BTC/USDT", "ETH/USDT"],
}: TickerProviderProps) {
  // State for the current pair
  const [currentPair, setCurrentPair] = useState<string>(defaultPair);

  // State for watched pairs
  const [watchedPairs, setWatchedPairs] =
    useState<string[]>(defaultWatchedPairs);

  // Use the WebSocket ticker hook for the current pair
  const {
    data: tickerData,
    isConnected,
    error,
    reconnect,
  } = useWebSocketTicker(currentPair);

  // Use the multi-ticker hook for watched pairs
  const {
    data: allTickersData,
    isAllConnected,
    errors,
  } = useMultiWebSocketTicker(watchedPairs);

  // Function to add a pair to the watched list
  const addPair = (pair: string) => {
    if (!watchedPairs.includes(pair)) {
      setWatchedPairs((prev) => [...prev, pair]);
    }
  };

  // Function to remove a pair from the watched list
  const removePair = (pair: string) => {
    setWatchedPairs((prev) => prev.filter((p) => p !== pair));
  };

  // Make sure the current pair is always in the watched list
  useEffect(() => {
    if (!watchedPairs.includes(currentPair)) {
      addPair(currentPair);
    }
  }, [currentPair, watchedPairs]);

  // Create the context value with useMemo
  const contextValue = useMemo(
    () => ({
      currentPair,
      setCurrentPair,
      tickerData,
      isConnected,
      error,
      reconnect,
      watchedPairs,
      addPair,
      removePair,
      allTickersData,
      isAllConnected,
      errors,
    }),
    [
      currentPair,
      tickerData,
      isConnected,
      error,
      reconnect,
      watchedPairs,
      addPair,
      removePair,
      allTickersData,
      isAllConnected,
      errors,
    ]
  );

  return (
    <TickerContext.Provider value={contextValue}>
      {children}
    </TickerContext.Provider>
  );
}

/**
 * Hook to use the ticker context
 */
export function useTickerContext() {
  const context = useContext(TickerContext);

  if (context === undefined) {
    throw new Error("useTickerContext must be used within a TickerProvider");
  }

  return context;
}

/**
 * Hook to get ticker data for a specific pair
 */
export function usePairTickerData(pair: string) {
  const { allTickersData, addPair } = useTickerContext();

  // Add the pair to the watched list if it's not already there
  useEffect(() => {
    addPair(pair);
  }, [pair, addPair]);

  return allTickersData[pair] || null;
}
