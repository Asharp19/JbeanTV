"use client";
import { useState, useRef, memo, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { MessageAnimationProvider } from "@/contexts/MessageAnimationContext";
import { BinanceProvider } from "@/contexts/BinanceContext";
import {
  ErrorBoundary,
  SectionErrorFallback,
} from "@/components/ErrorBoundary";

// Import components
import { AgentConsensusHeader } from "./components/AgentConsensusHeader";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { ActionButtons } from "./components/ActionButtons";
import { AgentGrid } from "./components/AgentGrid";
import { NotificationDisplay } from "./components/NotificationDisplay";
import { Notification } from "./components/types";
import { AgentStatus } from "./components/AgentStatus";
import { CEOChat } from "./components/CEOChat";
import { AgentHistoricalSection } from "./components/AgentHistoricalSection";

// Import hooks and utilities
import { useAgentMessages, useHistoricalPredictions } from "./hooks";
import { validateCoinPair, getMessageStrings, handleError } from "./utils/helpers";

interface AgentConsensusPageProps {
  params: {
    coinpair: string;
  };
}

export default memo(function AgentConsensusPage({
  params,
}: AgentConsensusPageProps) {
  // Validate coin pair format
  if (!validateCoinPair(params.coinpair)) {
    notFound();
  }

  const coinPair = params.coinpair.toUpperCase();
  const coinSymbol = coinPair.replace("USD", "");

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Refs
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { messages } = useAgentMessages(params.coinpair, loading);
  const { historicalPredictions, historicalLoading } =
    useHistoricalPredictions(coinPair);

  // Animation for page load with cleanup
  useEffect(() => {
    if (mainContentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          mainContentRef.current!.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out" }
        );
      }, mainContentRef);

      // Cleanup function
      return () => ctx.revert();
    }
  }, []);

  return (
    <BinanceProvider symbols={[coinPair]}>
      <main className="min-h-screen relative bg-gradient-to-br from-background-primary to-background-secondary">
        {/* Mascots */}
        <div className="fixed top-20 left-2 w-[100px] h-[100px] pointer-events-none z-10 opacity-80">
          <Image
            src="/JBEANMascot1l.png"
            alt="JBEAN AI Assistant"
            width={100}
            height={100}
            className="object-contain transform -scale-x-100"
          />
        </div>
        <div className="fixed bottom-20 right-2 w-[100px] h-[100px] pointer-events-none z-10 opacity-80">
          <Image
            src="/JBEANMascot1l.png"
            alt="JBEAN AI Assistant"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <MessageAnimationProvider>
          <div ref={mainContentRef} className="container mx-auto px-4 py-12">
            <div className="relative z-[1000]">
              <AgentConsensusHeader
                coinPair={coinPair}
                coinSymbol={coinSymbol}
                loading={loading}
                error={error}
              />
            </div>

            {error && <ErrorDisplay error={error} handleRetry={() => {}} />}

            <div className="relative z-[1]">
              <AgentStatus isLoading={loading && !error} />
            </div>

            <div className="mb-12">
              <ErrorBoundary
                fallback={
                  <SectionErrorFallback message="Failed to load action buttons" />
                }
              >
                <ActionButtons
                  loading={loading}
                  error={error}
                  showChat={showChat}
                  onToggleChat={() => setShowChat(!showChat)}
                  coinSymbol={coinSymbol}
                  messages={getMessageStrings(messages)}
                />
              </ErrorBoundary>

              {showChat && (
                <ErrorBoundary
                  fallback={
                    <SectionErrorFallback message="Failed to load chat interface" />
                  }
                >
                  <div className="mb-6 rounded-2xl border border-indigo-500/30 overflow-hidden bg-gradient-to-br from-[#121027] to-[#1c1b36] backdrop-blur-sm">
                    <div className="p-4 bg-surface-glass relative z-10">
                      <h3 className="text-lg font-medium text-white">
                        Chat with Coordinator Agent
                      </h3>
                    </div>
                    <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar bg-black/80">
                      <CEOChat
                        coinpair={params.coinpair}
                        onAnalysisComplete={() => {
                          // Optional: Add any completion handling
                        }}
                      />
                    </div>
                  </div>
                </ErrorBoundary>
              )}

              <ErrorBoundary
                fallback={
                  <SectionErrorFallback message="Failed to load agent grid" />
                }
              >
                <AgentGrid
                  coordinatorMessages={messages.CEO}
                  technicalMessages={messages.TechnicalAnalyst}
                  crowdMessages={messages.CrowdAnalyst}
                  isLoading={loading}
                  targetDate={messages.targetDate}
                />
              </ErrorBoundary>

              {notification && (
                <NotificationDisplay
                  notification={notification}
                  onClose={() => setNotification(null)}
                />
              )}
            </div>

            {/* Historical Predictions Section */}
            <ErrorBoundary
              fallback={
                <SectionErrorFallback message="Failed to load historical predictions" />
              }
            >
              <AgentHistoricalSection
                predictions={historicalPredictions}
                loading={historicalLoading}
                coinPair={coinPair}
              />
            </ErrorBoundary>
          </div>
        </MessageAnimationProvider>
      </main>
    </BinanceProvider>
  );
});
