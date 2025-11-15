"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { PredictionCard } from "@/app/predictions/[coinpair]/components/PredictionCard";
import { PredictionSkeleton } from "./nested/PredictionSkeleton";
import { CarouselHeader } from "./nested/CarouselHeader";
import { CarouselContent } from "./nested/CarouselContent";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface PredictionData {
  id: number;
  symbol: string;
  predictions: number;
  color: string;
  poolDistribution: {
    exactPrediction: number;
    within025Percent: number;
    within05Percent: number;
    within1Percent: number;
    within2Percent: number;
    pool90: number;
  };
  targetDate: string;
  rewardPool: string;
  requiredStreak: number;
}

interface PredictionCarouselProps {
  predictions?: PredictionData[];
}

export const PredictionCarousel = memo(function PredictionCarousel() {
  const predictions = useMemo(
    () => [
      {
        id: 1,
        symbol: "BTCUSD",
        color: "#ff9900",
        poolDistribution: {
          exactPrediction: 5,
          within025Percent: 15,
          within05Percent: 25,
          within1Percent: 30,
          within2Percent: 20,
          pool90: 5,
        },
        targetDate: "2025-02-12T12:00:00Z",
        rewardPool: "$ 90,000",
        requiredStreak: 587,
      },
      {
        id: 2,
        symbol: "ETHUSD",
        color: "#3c3c3d",
        poolDistribution: {
          exactPrediction: 3,
          within025Percent: 12,
          within05Percent: 20,
          within1Percent: 35,
          within2Percent: 25,
          pool90: 5,
        },
        targetDate: "2025-02-12T12:00:00Z",
        rewardPool: "$ 45,000",
        requiredStreak: 342,
      },
      {
        id: 3,
        symbol: "SOLUSD",
        color: "#14F195",
        poolDistribution: {
          exactPrediction: 4,
          within025Percent: 10,
          within05Percent: 22,
          within1Percent: 33,
          within2Percent: 26,
          pool90: 5,
        },
        targetDate: "2025-02-12T12:00:00Z",
        rewardPool: "$ 30,000",
        requiredStreak: 245,
      },
      {
        id: 4,
        symbol: "XRPUSD",
        color: "#23292F",
        poolDistribution: {
          exactPrediction: 3,
          within025Percent: 14,
          within05Percent: 23,
          within1Percent: 32,
          within2Percent: 23,
          pool90: 5,
        },
        targetDate: "2025-02-12T12:00:00Z",
        rewardPool: "$ 35,000",
        requiredStreak: 287,
      },
      {
        id: 5,
        symbol: "BNBUSD",
        color: "#F3BA2F",
        poolDistribution: {
          exactPrediction: 4,
          within025Percent: 13,
          within05Percent: 24,
          within1Percent: 31,
          within2Percent: 23,
          pool90: 5,
        },
        targetDate: "2025-02-12T12:00:00Z",
        rewardPool: "$ 40,000",
        requiredStreak: 312,
      },
    ],
    []
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(550);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const gap = 24;
  const visibleCards = 2;
  const maxIndex = Math.max(0, predictions.length - visibleCards);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate card width based on container size
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const newCardWidth = Math.max(
          300,
          (containerWidth - gap) / visibleCards
        );
        setCardWidth(newCardWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update animation values when cardWidth changes
  useEffect(() => {
    if (!carouselRef.current || !cardsRef.current) return;

    gsap.to(cardsRef.current, {
      x: -(currentIndex * (cardWidth + gap)),
      duration: 0.5,
      ease: "power2.out",
    });
  }, [cardWidth, currentIndex, maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && currentIndex < maxIndex) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, nextSlide, currentIndex, maxIndex]);

  useEffect(() => {
    if (!carouselRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Create a timeline for initial animation
      const tl = gsap.timeline();

      tl.from(".prediction-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all",
      });

      // Animate to current index
      gsap.to(cardsRef.current, {
        x: -(currentIndex * (cardWidth + gap)),
        duration: 0.5,
        ease: "power2.out",
      });

      // Initialize GSAP Draggable with bounds
      const draggable = Draggable.create(cardsRef.current, {
        type: "x",
        inertia: true,
        bounds: {
          minX: -(maxIndex * (cardWidth + gap)),
          maxX: 0,
        },
        edgeResistance: 0.65,
        dragResistance: 0.2,
        onDragStart: () => setIsPaused(true),
        onDragEnd: function () {
          setIsPaused(false);
          const x = this.endX;
          const nearestIndex = Math.round(Math.abs(x) / (cardWidth + gap));
          setCurrentIndex(Math.min(nearestIndex, maxIndex));
          gsap.to(cardsRef.current, {
            x: -(nearestIndex * (cardWidth + gap)),
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // Cleanup function
      return () => {
        draggable[0].kill();
        tl.kill();
      };
    });

    // Cleanup context
    return () => ctx.revert();
  }, [currentIndex, predictions.length, maxIndex, cardWidth]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="rounded-2xl bg-background-secondary/20 backdrop-blur-xl shadow-glass p-6">
        <CarouselHeader
          title="Active Predictions"
          onPrevClick={prevSlide}
          onNextClick={nextSlide}
          isPrevDisabled={currentIndex === 0 || isLoading}
          isNextDisabled={currentIndex === maxIndex || isLoading}
        />

        <CarouselContent
          predictions={predictions as PredictionData[]}
          carouselRef={carouselRef}
          cardsRef={cardsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cardWidth={cardWidth}
          gap={gap}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});
