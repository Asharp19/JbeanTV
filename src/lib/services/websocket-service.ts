/**
 * WebSocket Service - Centralized WebSocket connection management
 */

export interface WebSocketConfig {
  autoReconnect?: boolean;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: Error) => void;
  onMessage?: (data: any) => void;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectCount: number = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isMounted: boolean = true;
  private config: Required<WebSocketConfig>;

  constructor(private url: string, config: WebSocketConfig = {}) {
    this.config = {
      autoReconnect: config.autoReconnect ?? true,
      reconnectDelay: config.reconnectDelay ?? 3000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 5,
      onOpen: config.onOpen ?? (() => {}),
      onClose: config.onClose ?? (() => {}),
      onError: config.onError ?? (() => {}),
      onMessage: config.onMessage ?? (() => {}),
    };
  }

  connect(): void {
    this.cleanup();

    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to create WebSocket connection");
      this.config.onError(error);
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      if (this.isMounted) {
        this.reconnectCount = 0;
        this.config.onOpen();
      }
    };

    this.ws.onmessage = (event) => {
      if (this.isMounted) {
        try {
          const data = JSON.parse(event.data);
          this.config.onMessage(data);
        } catch (err) {
          console.error("Error parsing WebSocket data:", err);
        }
      }
    };

    this.ws.onerror = () => {
      if (this.isMounted) {
        this.config.onError(new Error("WebSocket connection error"));
      }
    };

    this.ws.onclose = (event) => {
      if (this.isMounted) {
        this.config.onClose(event);
        this.handleReconnect();
      }
    };
  }

  private handleReconnect(): void {
    if (
      this.config.autoReconnect &&
      this.reconnectCount < this.config.maxReconnectAttempts &&
      this.isMounted
    ) {
      this.reconnectTimeout = setTimeout(() => {
        if (this.isMounted) {
          this.reconnectCount++;
          this.connect();
        }
      }, this.config.reconnectDelay);
    }
  }

  disconnect(): void {
    this.isMounted = false;
    this.cleanup();
  }

  private cleanup(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
  }

  getReconnectCount(): number {
    return this.reconnectCount;
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

/**
 * Creates WebSocket URL from API base URL and endpoint
 */
export function createWebSocketUrl(endpoint: string, params?: Record<string, string>): string {
  const apiBaseUrl = process.env.NEXT_PUBLIC_AGENCY_API || "";
  const wsBaseUrl = apiBaseUrl.replace(/^http/, "ws");
  
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  
  return `${wsBaseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
}

