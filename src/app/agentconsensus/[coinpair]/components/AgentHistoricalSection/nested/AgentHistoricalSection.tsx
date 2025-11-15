import React, { useMemo, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HistoricalDataTable } from "@/app/agentconsensus/[coinpair]/components/HistoricalDataTable";
import { AgentPrediction } from "../../types";

interface AgentHistoricalSectionProps {
  predictions: AgentPrediction[];
  loading: boolean;
  coinPair: string;
}

// Add missing properties to match our predictions data structure
interface ExtendedAgentPrediction extends AgentPrediction {
  agentName: string;
  targetDate: string;
  predictionDate?: string;
}

type AgentType = "Coordinator Agent" | "AI Predictions" | "Wisdom of Crowds";

const AGENT_COLORS = {
  "Coordinator Agent": {
    background: "from-blue-900/20 to-blue-700/5",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
    header: "bg-blue-900/30",
    selected: "border-blue-500 text-blue-500",
    gradient: "from-blue-900/30 to-blue-800/10",
    glow: "shadow-blue-500/10",
  },
  "AI Predictions": {
    background: "from-purple-900/20 to-purple-700/5",
    border: "border-purple-500/20",
    dot: "bg-purple-500",
    header: "bg-purple-900/30",
    selected: "border-purple-500 text-purple-500",
    gradient: "from-purple-900/30 to-purple-800/10",
    glow: "shadow-purple-500/10",
  },
  "Wisdom of Crowds": {
    background: "from-teal-900/20 to-teal-700/5",
    border: "border-teal-500/20",
    dot: "bg-teal-500",
    header: "bg-teal-900/30",
    selected: "border-teal-500 text-teal-500",
    gradient: "from-teal-900/30 to-teal-800/10",
    glow: "shadow-teal-500/10",
  },
};

// Utility to get UTC midnight timestamp for a date
function getUTCMidnightTimestamp(date: Date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return d.getTime();
}

// Fetch OHLCV for a symbol and date from internal API (CORS-safe)
async function fetchActualPrices(symbol: string, date: Date) {
  const binanceSymbol = mapToBinanceSymbol(symbol);
  const startTime = getUTCMidnightTimestamp(date);
  const endTime = startTime + 24 * 60 * 60 * 1000 - 1; // End of the day
  const url = `/api/binance/klines?symbol=${binanceSymbol}&interval=1d&startTime=${startTime}&endTime=${endTime}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Use last_closed_candle or target_candle from backend response
    const candle = data.target_candle || data.last_closed_candle;
    if (candle && candle.high && candle.low && candle.close) {
      return {
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close),
      };
    }
  } catch (e) {
    console.error("Error fetching actual prices:", e);
  }
  return null;
}

// Map app coin pairs to Binance symbols using regex
function mapToBinanceSymbol(symbol: string) {
  return symbol.replace(/USD$/, "USDT");
}

export function AgentHistoricalSection({
  predictions,
  loading,
  coinPair,
}: AgentHistoricalSectionProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [enrichedPredictions, setEnrichedPredictions] = useState<
    ExtendedAgentPrediction[]
  >([]);
  const [enrichmentLoading, setEnrichmentLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabbedContentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Cast predictions to the extended type
  const typedPredictions = predictions as unknown as ExtendedAgentPrediction[];

  // Enrich predictions with missing actual price data
  useEffect(() => {
    let ignore = false;
    const cache = new Map<string, any>();

    async function enrichPredictionsWithActualPrices() {
      if (!typedPredictions.length) {
        setEnrichedPredictions([]);
        return;
      }

      setEnrichmentLoading(true);

      try {
        const enrichedData = await Promise.all(
          typedPredictions.map(async (pred) => {
            // Check if prediction already has actual price data
            const hasActualPrice =
              pred.actualPrice &&
              typeof pred.actualPrice === "object" &&
              "high" in pred.actualPrice &&
              "low" in pred.actualPrice &&
              "close" in pred.actualPrice &&
              (pred.actualPrice as any).high > 0 &&
              (pred.actualPrice as any).low > 0 &&
              (pred.actualPrice as any).close > 0;

            if (hasActualPrice) {
              return pred; // Return as-is if it already has actual price data
            }

            // Check if target date is in the future (UTC comparison)
            const targetDate = new Date(pred.targetDate);
            const currentUTCDate = new Date();
            currentUTCDate.setUTCHours(0, 0, 0, 0); // Set to UTC midnight for fair comparison

            if (targetDate.getTime() >= currentUTCDate.getTime()) {
              // Target date is today or in the future, keep as N/A
              return pred;
            }

            // Fetch actual prices for predictions with past target dates
            const cacheKey = `${coinPair}_${targetDate
              .toISOString()
              .slice(0, 10)}`;

            let actualPrices = cache.get(cacheKey);
            if (!actualPrices) {
              actualPrices = await fetchActualPrices(coinPair, targetDate);
              cache.set(cacheKey, actualPrices);
            }

            // Return enriched prediction with actual prices
            if (actualPrices) {
              return {
                ...pred,
                actualPrice: actualPrices,
              };
            }

            return pred; // Return original if we couldn't fetch actual prices
          })
        );

        if (!ignore) {
          setEnrichedPredictions(enrichedData);
        }
      } catch (error) {
        console.error("Error enriching predictions with actual prices:", error);
        if (!ignore) {
          setEnrichedPredictions(typedPredictions);
        }
      } finally {
        if (!ignore) {
          setEnrichmentLoading(false);
        }
      }
    }

    enrichPredictionsWithActualPrices();

    return () => {
      ignore = true;
    };
  }, [typedPredictions, coinPair]);

  const groupedPredictions = useMemo(() => {
    if (!enrichedPredictions.length) return {};

    // Group predictions by agent name
    const grouped: Record<string, AgentPrediction[]> = {};

    enrichedPredictions.forEach((prediction) => {
      if (!grouped[prediction.agentName]) {
        grouped[prediction.agentName] = [];
      }
      grouped[prediction.agentName].push(prediction);
    });

    // Remove deduplication here; let HistoricalDataTable handle it
    return grouped;
  }, [enrichedPredictions]);

  // Get unique agent names across all predictions
  const agentNames = useMemo(() => {
    return Object.keys(groupedPredictions).sort() as AgentType[];
  }, [groupedPredictions]);

  // Set default selected agent when data is loaded
  useEffect(() => {
    if (agentNames.length > 0 && !selectedAgent) {
      setSelectedAgent(agentNames[0] as AgentType);
    }
  }, [agentNames, selectedAgent]);

  // Handle tab selection with animation
  const handleTabSelect = (agentName: AgentType) => {
    if (selectedAgent === agentName) return;

    if (tabbedContentRef.current) {
      // Animate content out
      gsap.to(tabbedContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          // Change agent
          setSelectedAgent(agentName);

          // Animate content in
          gsap.to(tabbedContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    } else {
      setSelectedAgent(agentName);
    }
  };

  // Animation effect when component mounts
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  if (loading || enrichmentLoading) {
    return (
      <div className="w-full mb-12">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-surface-primary">
          <h2 className="text-2xl font-medium text-white">
            Historical Predictions
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
        </div>
      </div>
    );
  }

  if (!enrichedPredictions.length) {
    return (
      <div className="w-full mb-12">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-surface-primary">
          <h2 className="text-2xl font-medium text-white">
            Historical Predictions
          </h2>
        </div>
        <div className="text-center py-12 text-content-secondary">
          <p>No historical predictions available yet.</p>
        </div>
      </div>
    );
  }

  const currentAgentColor = selectedAgent
    ? AGENT_COLORS[selectedAgent]
    : AGENT_COLORS["Coordinator Agent"];

  return (
    <div className="w-full mb-12 h-[670px]" ref={containerRef}>
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-surface-primary">
        <h2 className="text-2xl font-medium text-white">
          Historical Predictions
        </h2>
      </div>

      {/* Agent selection tabs */}
      <div className="flex mb-6">
        {agentNames.map((agentName) => {
          const isSelected = selectedAgent === agentName;
          const agentColor = AGENT_COLORS[agentName as AgentType];

          return (
            <button
              key={agentName}
              ref={(el) => {
                if (el) tabsRef.current.set(agentName, el);
              }}
              onClick={() => handleTabSelect(agentName as AgentType)}
              className={`relative px-6 py-3 font-medium text-sm transition-all duration-300 ${
                isSelected
                  ? `${agentColor.selected} border-b-2`
                  : "text-content-secondary hover:text-white"
              }`}
            >
              <span className="flex items-center">
                <span
                  className={`w-2 h-2 mr-2 rounded-full ${
                    agentColor.dot
                  } transition-all duration-300 ${
                    isSelected ? "scale-125  shadow-glow" : ""
                  }`}
                ></span>
                {agentName}
              </span>
              {isSelected && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-surface-glass to-transparent"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Single table container with dynamic gradient based on selected agent */}
      <div
        ref={tabbedContentRef}
        className={`w-full rounded-md overflow-y-auto custom-scrollbar h-max border bg-gradient-to-br ${currentAgentColor.border} ${currentAgentColor.gradient} shadow-lg ${currentAgentColor.glow} transition-all duration-300`}
      >
        <div
          className={`p-4 ${currentAgentColor.header}  top-0 relative z-10 flex items-center`}
        >
          <div
            className={`w-3 h-3 mr-3 rounded-full ${currentAgentColor.dot}`}
          ></div>
          <h3 className="text-lg font-medium text-white">
            {selectedAgent} - Historical Predictions
          </h3>
        </div>
        <div className="p-4">
          {selectedAgent && (
            <HistoricalDataTable
              predictions={groupedPredictions[selectedAgent] as any}
              symbol={coinPair}
              loading={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
