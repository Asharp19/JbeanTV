interface ActionButtonsProps {
  loading: boolean;
  error: string | null;
  showChat: boolean;
  onToggleChat: () => void;
  coinSymbol: string;
  messages?: {
    CEO?: string[];
    TechnicalAnalyst?: string[];
    CrowdAnalyst?: string[];
  };
}

export function ActionButtons({
  loading,
  error,
  showChat,
  onToggleChat,
  coinSymbol,
  messages,
}: ActionButtonsProps) {
  const hasAgentMessages =
    messages &&
    ((messages.CEO && messages.CEO.length > 0) ||
      (messages.TechnicalAnalyst && messages.TechnicalAnalyst.length > 0) ||
      (messages.CrowdAnalyst && messages.CrowdAnalyst.length > 0));

  return (
    <div className="mb-6 relative bg-gradient-to-br from-[#121027] to-[#1c1b36] rounded-2xl backdrop-blur-sm border border-white overflow-hidden">
      <div className="flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center">
          {loading && !error ? (
            <div className="w-4 h-4 mr-2 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <span className="text-white font-medium">
            {loading && !error
              ? `Analyzing ${coinSymbol}/USD market data...`
              : error
              ? "Analysis failed - please retry"
              : hasAgentMessages
              ? messages &&
                (messages.CEO?.some((msg) => msg.includes("cancelled")) ||
                  messages.TechnicalAnalyst?.some((msg) =>
                    msg.includes("cancelled")
                  ) ||
                  messages.CrowdAnalyst?.some((msg) =>
                    msg.includes("cancelled")
                  ))
                ? "⚠️ Analysis incomplete - No Real user predictions available. Go to predictions page to make a prediction now!"
                : "Analysis complete"
              : "Ready for analysis"}
          </span>
        </div>

        <button
          onClick={onToggleChat}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          Chat with Coordinator Agent
        </button>
      </div>
    </div>
  );
}
