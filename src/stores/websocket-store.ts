/**
 * WebSocket Store - Manages WebSocket connection state
 */

import { create } from "zustand";

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

interface WebSocketState {
  // Connection state
  isConnected: boolean;
  connections: Map<string, WebSocket>;
  
  // Ticker data
  tickerData: Record<string, TickerData | null>;
  
  // Error tracking
  errors: Record<string, Error | null>;
  
  // Actions
  setConnected: (connected: boolean) => void;
  setConnection: (pair: string, ws: WebSocket | null) => void;
  setTickerData: (pair: string, data: TickerData) => void;
  setError: (pair: string, error: Error | null) => void;
  clearError: (pair: string) => void;
  clearAllErrors: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  isConnected: false,
  connections: new Map(),
  tickerData: {},
  errors: {},

  setConnected: (connected) => set({ isConnected: connected }),

  setConnection: (pair, ws) =>
    set((state) => {
      const newConnections = new Map(state.connections);
      if (ws) {
        newConnections.set(pair, ws);
      } else {
        newConnections.delete(pair);
      }
      return { connections: newConnections };
    }),

  setTickerData: (pair, data) =>
    set((state) => ({
      tickerData: {
        ...state.tickerData,
        [pair]: data,
      },
    })),

  setError: (pair, error) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [pair]: error,
      },
    })),

  clearError: (pair) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[pair];
      return { errors: newErrors };
    }),

  clearAllErrors: () => set({ errors: {} }),
}));

