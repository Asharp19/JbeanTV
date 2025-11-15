"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Available trading pairs
export const COIN_PAIRS = ["BTCUSD", "ETHUSD", "SOLUSD", "XRPUSD", "BNBUSD"];

// Map for icon representation
const COIN_ICONS: Record<string, string> = {
  BTC: "₿", // Bitcoin symbol
  ETH: "Ξ", // Ethereum symbol
  SOL: "◎", // Solana symbol
  XRP: "✗", // XRP symbol
  BNB: "ℬ", // BNB symbol
};

interface AgentConsensusHeaderProps {
  coinPair: string;
  coinSymbol: string;
  loading: boolean;
  error: string | null;
}

export function AgentConsensusHeader({
  coinPair,
  coinSymbol,
  loading,
  error,
}: AgentConsensusHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handlePairChange = (newPair: string) => {
    if (newPair !== coinPair) {
      router.push(`/agentconsensus/${newPair}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-slate-100">
        Agent Consensus: {coinSymbol}/USD
      </h1>

      <div className="mt-4 md:mt-0 relative z-[1000]">
        <div className="flex items-center gap-2">
          <span className="text-content-secondary text-sm font-medium">
            Trading Pair:
          </span>

          {/* Custom dropdown selector */}
          <div className="relative">
            <button
              onClick={() => !loading && setIsOpen(!isOpen)}
              disabled={loading && !error}
              className={`flex items-center justify-between gap-2 w-[150px] bg-[rgba(30,41,59,0.8)] 
                backdrop-blur-sm text-content-primary rounded-md border border-indigo-500/30 
                px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary
                transition-all duration-200 hover:bg-[rgba(37,49,70,0.8)] hover:border-indigo-500/50
                ${
                  loading && !error
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-2 text-indigo-400 font-bold">
                  {COIN_ICONS[coinSymbol] || coinSymbol[0]}
                </span>
                <span className="font-medium">{coinSymbol}/USD</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute mt-1 w-full origin-top-right rounded-md shadow-lg z-[1000]">
                <div className="rounded-md bg-[rgba(30,41,59,0.95)] backdrop-blur-md border border-indigo-500/30 shadow-lg ring-1 ring-black ring-opacity-5 p-1">
                  <div className="max-h-60 overflow-auto custom-scrollbar z-[1000]">
                    {COIN_PAIRS.map((pair) => {
                      const pairSymbol = pair.slice(0, -3);
                      const isSelected = pair === coinPair;

                      return (
                        <button
                          key={pair}
                          onClick={() => handlePairChange(pair)}
                          className={`flex items-center w-full px-3 py-2 text-sm rounded-md
                            ${
                              isSelected
                                ? "bg-indigo-600/30 text-white"
                                : "text-content-secondary hover:bg-[rgba(37,49,70,0.8)] hover:text-white"
                            } transition-colors duration-150 ease-in-out`}
                        >
                          <span className="text-lg mr-2 text-indigo-400 font-bold">
                            {COIN_ICONS[pairSymbol] || pairSymbol[0]}
                          </span>
                          <span>{pairSymbol}/USD</span>

                          {isSelected && (
                            <svg
                              className="ml-auto w-4 h-4 text-indigo-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
