/**
 * React hook for WebSocket subscriptions
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { websocketManager } from "../websocket-manager";
import { TickerData } from "../types";
import { useWebSocketStore } from "@/stores/websocket-store";

export function useWebSocket(symbol: string, enabled: boolean = true) {
  const [data, setData] = useState<TickerData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const subscriberIdRef = useRef<string | null>(null);

  // Update store
  const setTickerData = useWebSocketStore((state) => state.setTickerData);
  const setStoreError = useWebSocketStore((state) => state.setError);
  const clearStoreError = useWebSocketStore((state) => state.clearError);

  const handleMessage = useCallback((tickerData: TickerData) => {
    setData(tickerData);
    setTickerData(symbol, tickerData);
  }, [symbol, setTickerData]);

  const handleError = useCallback((err: Error) => {
    setError(err);
    setStoreError(symbol, err);
  }, [symbol, setStoreError]);

  const handleConnect = useCallback(() => {
    setIsConnected(true);
    setError(null);
    clearStoreError(symbol);
  }, [symbol, clearStoreError]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Subscribe
    subscriberIdRef.current = websocketManager.subscribe(symbol, {
      onMessage: handleMessage,
      onError: handleError,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
    });

    // Cleanup
    return () => {
      if (subscriberIdRef.current) {
        websocketManager.unsubscribe(subscriberIdRef.current);
        subscriberIdRef.current = null;
      }
    };
  }, [symbol, enabled, handleMessage, handleError, handleConnect, handleDisconnect]);

  const reconnect = useCallback(() => {
    if (subscriberIdRef.current) {
      websocketManager.unsubscribe(subscriberIdRef.current);
    }
    subscriberIdRef.current = websocketManager.subscribe(symbol, {
      onMessage: handleMessage,
      onError: handleError,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
    });
  }, [symbol, handleMessage, handleError, handleConnect, handleDisconnect]);

  return {
    data,
    isConnected,
    error,
    reconnect,
  };
}

