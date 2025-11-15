import { memo } from "react";
import { motion } from "framer-motion";

interface PredictionSkeletonProps {
  width?: number;
}

export const PredictionSkeleton = memo(function PredictionSkeleton({
  width,
}: PredictionSkeletonProps) {
  return (
    <div
      className="prediction-card bg-background-secondary/40 border border-primary/30 shadow-glass rounded-xl p-2 sm:p-3 lg:p-4 overflow-hidden"
      style={{ width: width ? `${width}px` : "auto" }}
    >
      <div className="flex flex-row gap-4 h-full">
        {/* Left Column - 3D Loading Animation */}
        <div className="w-[180px] lg:w-[220px] shrink-0">
          <div className="relative aspect-square w-full h-full bg-gradient-glass rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
              animate={{
                opacity: 0.5,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </div>
        </div>

        {/* Right Column - Content Skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-content-primary/10 rounded animate-pulse" />
            <div className="h-4 w-32 bg-content-primary/10 rounded animate-pulse" />
          </div>

          {/* Distribution Skeleton */}
          <div className="p-3 rounded-xl bg-gradient-glass">
            <div className="h-4 w-32 bg-content-primary/10 rounded mb-3 animate-pulse" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-12 bg-content-primary/10 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-content-primary/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="flex-1 p-3 rounded-xl bg-gradient-glass">
            <div className="h-4 w-20 bg-content-primary/10 rounded mb-3 animate-pulse" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-content-primary/10 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-content-primary/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Date Skeleton */}
          <div className="p-3 rounded-xl bg-gradient-glass">
            <div className="h-4 w-24 bg-content-primary/10 rounded mb-2 animate-pulse" />
            <div className="h-5 w-40 bg-content-primary/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
});
