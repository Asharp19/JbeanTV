/**
 * Unified WebSocket Manager
 * Manages WebSocket connections with connection pooling and automatic reconnection
 */

import { TickerData, WebSocketMessage, SubscriptionOptions } from "./types";

interface Connection {
  ws: WebSocket;
  symbols: Set<string>;
  subscribers: Map<string, Set<string>>; // symbol -> Set of subscriber IDs
  reconnectAttempts: number;
  reconnectTimeout?: NodeJS.Timeout;
  pingInterval?: NodeJS.Timeout;
}

class WebSocketManager {
  private connections: Map<string, Connection> = new Map();
  private subscriptions: Map<string, SubscriptionOptions> = new Map();
  private subscriberCounter = 0;

  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_DELAY = 2000;
  private readonly MAX_RECONNECT_DELAY = 30000;
  private readonly PING_INTERVAL = 60000; // 1 minute
  private readonly RECONNECT_INTERVAL = 23 * 60 * 60 * 1000; // 23 hours

  /**
   * Subscribe to a symbol
   */
  subscribe(symbol: string, options: SubscriptionOptions = {}): string {
    const subscriberId = `sub-${this.subscriberCounter++}`;
    this.subscriptions.set(subscriberId, options);

    const connectionKey = this.getConnectionKey([symbol]);
    let connection = this.connections.get(connectionKey);

    if (!connection) {
      connection = this.createConnection([symbol]);
      this.connections.set(connectionKey, connection);
    }

    // Add subscriber to symbol
    if (!connection.subscribers.has(symbol)) {
      connection.subscribers.set(symbol, new Set());
    }
    connection.subscribers.get(symbol)!.add(subscriberId);

    return subscriberId;
  }

  /**
   * Unsubscribe from a symbol
   */
  unsubscribe(subscriberId: string): void {
    this.subscriptions.delete(subscriberId);

    // Remove subscriber from all connections
    this.connections.forEach((connection, key) => {
      connection.subscribers.forEach((subscribers, symbol) => {
        subscribers.delete(subscriberId);
        
        // If no more subscribers for this symbol, remove it
        if (subscribers.size === 0) {
          connection.subscribers.delete(symbol);
          connection.symbols.delete(symbol);
        }
      });

      // If no more symbols in connection, close it
      if (connection.symbols.size === 0) {
        this.closeConnection(key);
      }
    });
  }

  /**
   * Create a new WebSocket connection
   */
  private createConnection(symbols: string[]): Connection {
    const formattedSymbols = symbols.map((s) =>
      s.toLowerCase().replace("usd", "usdt")
    );

    const streamUrl = `wss://stream.binance.com:9443/stream?streams=${formattedSymbols
      .map((s) => `${s}@ticker`)
      .join("/")}`;

    const ws = new WebSocket(streamUrl);
    const connection: Connection = {
      ws,
      symbols: new Set(symbols),
      subscribers: new Map(),
      reconnectAttempts: 0,
    };

    ws.onopen = () => {
      console.log(`WebSocket connected for symbols: ${symbols.join(", ")}`);
      connection.reconnectAttempts = 0;
      this.setupPing(connection);
      this.scheduleReconnect(connection, symbols);

      // Notify subscribers
      const allSubscribers = this.getAllSubscribers(connection);
      allSubscribers.forEach(subscriberId => {
        this.subscriptions.get(subscriberId)?.onConnect?.();
      });
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (message.data && message.data.s) {
          const symbol = message.data.s.replace("USDT", "USD");
          const tickerData: TickerData = {
            pair: symbol,
            price: parseFloat(message.data.c),
            timestamp: Date.now(),
            volume: parseFloat(message.data.v),
            high24h: parseFloat(message.data.h),
            low24h: parseFloat(message.data.l),
            change24h: parseFloat(message.data.p),
            changePercent24h: parseFloat(message.data.P),
          };

          // Notify all subscribers for this symbol
          const subscribers = connection.subscribers.get(symbol);
          if (subscribers) {
            subscribers.forEach(subscriberId => {
              this.subscriptions.get(subscriberId)?.onMessage?.(tickerData);
            });
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      const allSubscribers = this.getAllSubscribers(connection);
      allSubscribers.forEach(subscriberId => {
        this.subscriptions.get(subscriberId)?.onError?.(new Error(error.type || 'WebSocket error'));
      });
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.cleanupConnection(connection);

      // Notify subscribers
      const allSubscribers = this.getAllSubscribers(connection);
      allSubscribers.forEach(subscriberId => {
        this.subscriptions.get(subscriberId)?.onDisconnect?.();
      });

      // Attempt reconnection
      if (connection.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
        this.reconnect(connection, symbols);
      }
    };

    return connection;
  }

  /**
   * Setup ping to keep connection alive
   */
  private setupPing(connection: Connection): void {
    if (connection.pingInterval) {
      clearInterval(connection.pingInterval);
    }

    connection.pingInterval = setInterval(() => {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.send(JSON.stringify({ ping: Date.now() }));
      }
    }, this.PING_INTERVAL);
  }

  /**
   * Schedule automatic reconnection after 23 hours
   */
  private scheduleReconnect(connection: Connection, symbols: string[]): void {
    if (connection.reconnectTimeout) {
      clearTimeout(connection.reconnectTimeout);
    }

    connection.reconnectTimeout = setTimeout(() => {
      console.log("Scheduled 23-hour reconnection");
      connection.ws.close();
      const connectionKey = this.getConnectionKey(symbols);
      this.connections.delete(connectionKey);
      this.createConnection(symbols);
    }, this.RECONNECT_INTERVAL);
  }

  /**
   * Reconnect with exponential backoff
   */
  private reconnect(connection: Connection, symbols: string[]): void {
    connection.reconnectAttempts++;
    const delay = Math.min(
      this.RECONNECT_DELAY * Math.pow(2, connection.reconnectAttempts - 1),
      this.MAX_RECONNECT_DELAY
    );

    console.log(
      `Reconnecting in ${delay}ms (attempt ${connection.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`
    );

    setTimeout(() => {
      const connectionKey = this.getConnectionKey(symbols);
      this.connections.delete(connectionKey);
      const newConnection = this.createConnection(symbols);
      this.connections.set(connectionKey, newConnection);
    }, delay);
  }

  /**
   * Clean up connection resources
   */
  private cleanupConnection(connection: Connection): void {
    if (connection.pingInterval) {
      clearInterval(connection.pingInterval);
      connection.pingInterval = undefined;
    }
    if (connection.reconnectTimeout) {
      clearTimeout(connection.reconnectTimeout);
      connection.reconnectTimeout = undefined;
    }
  }

  /**
   * Close a connection
   */
  private closeConnection(connectionKey: string): void {
    const connection = this.connections.get(connectionKey);
    if (connection) {
      this.cleanupConnection(connection);
      connection.ws.close();
      this.connections.delete(connectionKey);
    }
  }

  /**
   * Get all subscriber IDs for a connection
   */
  private getAllSubscribers(connection: Connection): Set<string> {
    const allSubscribers = new Set<string>();
    connection.subscribers.forEach(subscribers => {
      subscribers.forEach(subscriberId => {
        allSubscribers.add(subscriberId);
      });
    });
    return allSubscribers;
  }

  /**
   * Generate connection key from symbols
   */
  private getConnectionKey(symbols: string[]): string {
    return symbols.sort().join(",");
  }

  /**
   * Close all connections
   */
  closeAll(): void {
    const keys: string[] = [];
    this.connections.forEach((_, key) => {
      keys.push(key);
    });
    keys.forEach(key => {
      this.closeConnection(key);
    });
  }
}

// Export singleton instance
export const websocketManager = new WebSocketManager();

