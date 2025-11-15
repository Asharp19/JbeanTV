/**
 * WebSocket Types
 */

export interface TickerData {
  pair: string;
  price: number;
  timestamp: number;
  volume: number;
  high24h?: number;
  low24h?: number;
  change24h?: number;
  changePercent24h?: number;
}

export interface WebSocketMessage {
  data: {
    s: string; // symbol
    c: string; // close price
    v: string; // volume
    h: string; // high 24h
    l: string; // low 24h
    p: string; // price change
    P: string; // price change percent
  };
}

export type MessageHandler = (data: TickerData) => void;
export type ErrorHandler = (error: Error) => void;
export type ConnectionHandler = () => void;

export interface SubscriptionOptions {
  onMessage?: MessageHandler;
  onError?: ErrorHandler;
  onConnect?: ConnectionHandler;
  onDisconnect?: ConnectionHandler;
}

