"use client";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { PredictionJarsHandle } from "./components/PredictionJars";
import { notFound, useRouter } from "next/navigation";
import { StatsCard } from "./components/StatsCard";
import { ChartSection } from "./components/ChartSection";
import { PredictionForm } from "./components/PredictionForm";
import { PairSelector } from "./components/PairSelector";
import { PriceHeader } from "./components/PriceHeader";
import { SubmissionSuccess } from "./components/SubmissionSuccess";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";
import {
  usePriceData,
  usePredictionCounts,
  useTargetDate,
  useUserPrediction,
} from "./hooks";
import { AVAILABLE_PAIRS } from "./constants/tradingPairs";
import { formatPrice, validateCoinPair } from "./utils/formatters";

interface PredictionPageProps {
  params: {
    coinpair: string;
  };
}

export default function PredictionPage({ params }: PredictionPageProps) {
  // Validate coin pair format
  if (!validateCoinPair(params.coinpair)) {
    notFound();
  }

  // Refs
  const jarsRef = useRef<PredictionJarsHandle>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Local state
  const [selectedPair, setSelectedPair] = useState(params.coinpair);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [predictionToEdit, setPredictionToEdit] = useState<any | null>(null);

  // Session
  const { data: session, status } = useSession();

  // Custom hooks
  const { priceData, setPriceData, currentPrice, isLoading, hasError } =
    usePriceData(selectedPair);
  const {
    pairPredictionCounts,
    setPairPredictionCounts,
    predictionCountsLoading,
    readyToRender,
  } = usePredictionCounts(selectedPair);
  const { targetDate } = useTargetDate(selectedPair);
  const { predictionSubmitted, setPredictionSubmitted } = useUserPrediction(
    selectedPair,
    status,
    session
  );

  // Find current pair data
  const currentPair = useMemo(
    () =>
      AVAILABLE_PAIRS.find((p) => p.symbol === selectedPair) ||
      AVAILABLE_PAIRS[0],
    [selectedPair]
  );

  // Stats state based on current pair
  const [stats, setStats] = useState({
    totalPredictions: pairPredictionCounts[selectedPair] ?? 0,
    rewardPool: currentPair?.rewardPool || "$ 0",
    currentStreak: currentPair?.currentStreak || 0,
    targetDate: targetDate || "",
  });

  // Update stats when prediction counts or targetDate change
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      totalPredictions: pairPredictionCounts[selectedPair] ?? 0,
      rewardPool: currentPair?.rewardPool || "$ 0",
      currentStreak: currentPair?.currentStreak || 0,
      targetDate: targetDate || "",
    }));
  }, [selectedPair, pairPredictionCounts, currentPair, targetDate]);

  // Handle successful prediction submission
  const handlePredictionSuccess = useCallback(
    (isEditing = false) => {
      // Only update these stats if it's a new prediction, not an edit
      if (!isEditing) {
        // Update stats
        setStats((prev) => ({
          ...prev,
          totalPredictions: prev.totalPredictions + 1,
        }));

        // Update the prediction counts state
        setPairPredictionCounts((prev) => ({
          ...prev,
          [selectedPair]: (prev[selectedPair] || 0) + 1,
        }));

        // Show success animation by adding a bean to the jar
        if (jarsRef.current) {
          jarsRef.current.addBeanToPair();
        }
      }

      // Always mark as submitted regardless of whether it's a new prediction or an edit
      setPredictionSubmitted(true);
    },
    [selectedPair, setPairPredictionCounts, setPredictionSubmitted]
  );

  // Handle tab change with animation
  const handleTabChange = useCallback(
    async (symbol: string) => {
      if (symbol === selectedPair || isTransitioning) return;

      setIsTransitioning(true);

      // Animate out
      await gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Update state and URL
      setSelectedPair(symbol);
      router.push(`/predictions/${symbol}`, { scroll: false });

      // Update stats based on new pair
      const newPair = AVAILABLE_PAIRS.find((p) => p.symbol === symbol);
      if (newPair) {
        setStats({
          totalPredictions: pairPredictionCounts[symbol] || 0,
          rewardPool: newPair.rewardPool,
          currentStreak: newPair.currentStreak,
          targetDate: targetDate as string,
        });
      }

      // Animate in
      await gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      setIsTransitioning(false);
    },
    [selectedPair, isTransitioning, router, pairPredictionCounts, targetDate]
  );

  // Format price for display
  const formattedPrice = formatPrice(currentPrice);

  // Handler for edit button
  const handleEdit = useCallback(() => {
    setPredictionSubmitted(false);
    setEditMode(true);
    setPredictionToEdit(null);
  }, [setPredictionSubmitted]);

  // Handler for retry after error
  const handleRetry = useCallback(() => {
    setPriceData((prev) => ({
      ...prev,
      [selectedPair]: {
        isLoading: false,
        error: undefined,
      },
    }));
  }, [selectedPair, setPriceData]);

  return (
    <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
      {/* Enhanced Heading Section */}
      <PriceHeader pair={currentPair} formattedPrice={formattedPrice} />

      <div className="mt-8 flex flex-col gap-6">
        {/* Tabs for coin pair selection with branded colors */}
        <PairSelector
          availablePairs={AVAILABLE_PAIRS}
          selectedPair={selectedPair}
          onPairChange={handleTabChange}
        />

        {/* Main content with animation wrapper */}
        <div ref={contentRef} className="flex flex-col gap-6">
          {/* Stats Card */}
          <div className="h-[60vh]">
            <ChartSection symbol={selectedPair} />
          </div>

          {/* Chart & Prediction Jars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-full flex flex-col">
              {!readyToRender || predictionCountsLoading[selectedPair] ? (
                <LoadingSkeleton type="chart" />
              ) : (
                <StatsCard
                  stats={stats}
                  jarsRef={jarsRef}
                  pair={{
                    symbol: currentPair.symbol,
                    name: currentPair.name,
                    predictions: stats.totalPredictions,
                    color: currentPair.color,
                    currentPrice,
                  }}
                />
              )}
            </div>

            {/* Prediction Form */}
            <div className="flex flex-col">
              {!predictionSubmitted ? (
                <>
                  {isLoading ? (
                    <LoadingSkeleton type="form" />
                  ) : hasError ? (
                    <ErrorDisplay
                      error={
                        priceData[selectedPair]?.error ||
                        "Could not load current price data. Please try again later."
                      }
                      onRetry={handleRetry}
                    />
                  ) : (
                    <PredictionForm
                      symbol={selectedPair}
                      currentPrice={currentPrice}
                      targetDate={targetDate || ""}
                      onSuccess={handlePredictionSuccess}
                      isEditing={editMode}
                      predictionId={predictionToEdit?.id}
                    />
                  )}
                </>
              ) : (
                <SubmissionSuccess onEdit={handleEdit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
