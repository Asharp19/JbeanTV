declare global {
  interface Window {
    TradingView: any;
  }
}

declare module "@/types/trading-view" {
  interface TradingViewDrawingTool {
    name: string;
  }

  interface TradingViewDrawingsAccess {
    type: "all" | "none" | "black" | "white";
    tools?: TradingViewDrawingTool[];
  }

  interface TradingViewStudiesOverrides {
    [key: string]: string | number;
  }

  interface TradingViewOverrides {
    [key: string]: string | boolean | number;
  }

  interface TradingViewConfig {
    // Required
    container_id: string;

    // Datafeed
    symbol: string;
    interval: string;
    datafeed?: {
      onReady: (callback: (config: any) => void) => void;
      searchSymbols: (
        userInput: string,
        exchange: string,
        symbolType: string,
        onResult: (result: any) => void
      ) => void;
      resolveSymbol: (
        symbolName: string,
        onSymbolResolvedCallback: (symbolInfo: any) => void,
        onResolveErrorCallback: (reason: string) => void
      ) => void;
      getBars: (
        symbolInfo: any,
        resolution: string,
        from: number,
        to: number,
        onHistoryCallback: (bars: any[], meta: { noData: boolean }) => void,
        onErrorCallback: (reason: string) => void
      ) => void;
      subscribeBars: (
        symbolInfo: any,
        resolution: string,
        onRealtimeCallback: (bar: any) => void,
        subscriberUID: string,
        onResetCacheNeededCallback: () => void
      ) => void;
      unsubscribeBars: (subscriberUID: string) => void;
    };

    // Customization
    library_path?: string;
    theme?: "light" | "dark";
    custom_css_url?: string;
    loading_screen?: { backgroundColor: string; foregroundColor: string };

    // Features & Behavior
    disabled_features?: string[];
    enabled_features?: string[];
    fullscreen?: boolean;
    autosize?: boolean;

    // Toolbar & Panels
    toolbar_bg?: string;
    studies_access?: {
      type: "black" | "white";
      tools: Array<{ name: string }>;
    };
    drawings_access?: {
      type: "black" | "white";
      tools: Array<{ name: string }>;
    };
    saved_data?: any;

    // Appearance
    locale?: string;
    numeric_formatting?: { decimal_sign: string };
    timezone?: string;
    width?: number | string;
    height?: number | string;

    // Studies & Indicators
    studies_overrides?: Record<string, any>;
    overrides?: Record<string, any>;

    // Saving/Loading
    charts_storage_url?: string;
    charts_storage_api_version?: string;
    client_id?: string;
    user_id?: string;

    // Time Frames
    time_frames?: Array<{
      text: string;
      resolution: string;
      description?: string;
      title?: string;
    }>;
  }
}

export type { TradingViewConfig };
