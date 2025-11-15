interface ErrorDisplayProps {
  error: string;
  handleRetry: () => void;
}

export function ErrorDisplay({ error, handleRetry }: ErrorDisplayProps) {
  return (
    <div className="mb-8 p-4 rounded-xl bg-red-500/20 border border-red-500 text-white">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="font-medium">Connection Error</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-xs mt-2 opacity-80">
            Check that the API server is running at{" "}
            {process.env.NEXT_PUBLIC_AGENCY_API || "http://localhost:8000/api"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-md transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
