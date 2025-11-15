interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="bg-background-secondary/40 backdrop-blur-xl rounded-2xl p-6 border border-error-border h-full">
      <h3 className="text-lg font-semibold text-content-primary mb-4">
        Error Loading Price Data
      </h3>
      <p className="text-error-foreground">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  );
}

