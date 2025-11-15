interface LoadingSkeletonProps {
  type: "chart" | "form";
}

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  if (type === "chart") {
    return (
      <div className="animate-pulse bg-background-secondary/40 backdrop-blur-xl rounded-2xl p-6 border border-content-quaternary h-96">
        <div className="h-6 bg-content-quaternary/50 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-content-quaternary/50 rounded"></div>
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-background-secondary/40 backdrop-blur-xl rounded-2xl p-6 border border-content-quaternary h-full">
      <div className="h-6 bg-content-quaternary/50 rounded w-1/2 mb-6"></div>
      <div className="space-y-4">
        <div className="h-24 bg-content-quaternary/50 rounded"></div>
        <div className="h-24 bg-content-quaternary/50 rounded"></div>
        <div className="h-24 bg-content-quaternary/50 rounded"></div>
      </div>
    </div>
  );
}

