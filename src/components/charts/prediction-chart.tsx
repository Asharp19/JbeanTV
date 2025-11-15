import { useEffect, useRef, useState } from "react";
import React from "react";

interface TradingViewConfig {
  container_id: string;
  symbol?: string;
  interval: string;
  theme: "light" | "dark";
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  height: string | number;
  width: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

interface PredictionChartProps {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
}

export const PredictionChart = React.memo(function PredictionChart({
  symbol,
  interval = "D",
  theme = "dark",
}: PredictionChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [containerId] = useState(
    `tradingview_${symbol?.toLowerCase()}_${Math.floor(
      Math.random() * 1000000
    )}`
  );

  useEffect(() => {
    // Set the container ID immediately when component mounts
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    // Load TradingView script if not already loaded
    const loadTradingViewScript = () => {
      return new Promise<void>((resolve) => {
        if (window.TradingView) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // Clean up any previous widget
    const cleanupWidget = () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {
          console.error("Error removing previous widget:", e);
        }
        widgetRef.current = null;
      }
    };

    // Initialize widget with delay to ensure container is ready
    const initializeWidget = async () => {
      try {
        await loadTradingViewScript();

        // Make sure the container exists and is in the DOM
        if (!containerRef.current || !document.getElementById(containerId)) {
          console.error("Container not found in DOM");
          return;
        }

        // Add a small delay to ensure the container is properly rendered with dimensions
        setTimeout(() => {
          try {
            if (!window.TradingView) {
              console.error("TradingView not available");
              return;
            }

            // Create new widget instance
            widgetRef.current = new window.TradingView.widget({
              container_id: containerId,
              symbol: `BINANCE:${symbol?.replace("USD", "USDT")}`,
              interval: interval,
              theme: theme,
              style: "1",
              timezone: "Etc/UTC",
              locale: "en",
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              hide_top_toolbar: false,
              hide_side_toolbar: false,
              allow_symbol_change: false,
              save_image: true,
              studies: ["MACD@tv-basicstudies"],
              width: "100%",
              height: "100%",
            });
          } catch (error) {
            console.error("Error creating TradingView widget:", error);
          }
        }, 300); // 300ms delay to ensure DOM is ready
      } catch (error) {
        console.error("Error initializing TradingView widget:", error);
      }
    };

    // Clean up first, then initialize
    cleanupWidget();
    initializeWidget();

    // Cleanup on unmount
    return () => {
      cleanupWidget();
    };
  }, [symbol, interval, theme, containerId]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
});
