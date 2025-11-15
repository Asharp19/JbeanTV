import React, { useRef, useEffect, useState, useMemo } from "react";
import { ColumnContainer } from "./nested/ColumnContainer";
import { MessageDisplay } from "./nested/MessageDisplay";
import { AgentCardView } from "../AgentCardView";
import { AgentMessages, Message } from "../types";
import { useMessageAnimation } from "@/contexts/MessageAnimationContext";
import { parseMarkdown } from "@/lib/utils/markdown";
import { useBinanceData } from "@/contexts/BinanceContext";

// Type for messages with generated IDs
interface MessageWithId {
  id: string;
  content: string;
  timestamp: number;
  is_final?: boolean;
}

export interface AgentColumnProps {
  title: string;
  messages: (string | Message)[];
  isLoading?: boolean;
  targetDate?: string;
  contributorsData?: string;
  technicalMessages?: (string | Message)[];
  crowdMessages?: (string | Message)[];
}

export function AgentColumn({
  title,
  messages,
  isLoading = false,
  targetDate,
  contributorsData,
  technicalMessages,
  crowdMessages,
}: AgentColumnProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { registerMessage, isAnimating } = useMessageAnimation();
  const messageIdsRef = useRef<Map<string, string>>(new Map());
  const [viewMode, setViewMode] = useState<"card" | "detail">("card");
  const [messageUpdateTrigger, setMessageUpdateTrigger] = useState(0);

  // Extract contributors data for display
  const getContributorsData = () => {
    if (title.includes("Crowd")) {
      // For Crowd Analysis agent, try to get from messages first, then fallback to passed-in data
      const extractedData = extractContributorsData(messages);
      return extractedData || contributorsData;
    }
    // For other agents (like Coordinator), just use the passed-in data
    return contributorsData;
  };

  const extractContributorsData = (messages: (string | Message)[]) => {
    if (!Array.isArray(messages) || messages.length === 0) return undefined;

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage) return undefined;

    const content =
      typeof latestMessage === "string"
        ? latestMessage
        : latestMessage.content || "";

    const contributorsRegex =
      /(?:LEADING CONTRIBUTORS:|Contributors:|0x[a-f0-9]+)[\s\S]+?(?=(?:\n\n|\n(?:ANALYSIS|SUMMARY|High|Low|Close|##|$)))/i;
    const matches = content.match(contributorsRegex);

    return matches ? matches[0] : undefined;
  };

  // Toggle between view modes
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "detail" : "card"));
  };

  // Process messages to extract content and generate IDs
  const messagesWithIds = useMemo(() => {
    if (!Array.isArray(messages)) {
      return [];
    }

    return messages.map((message: any, index) => {
      // Extract message content based on different possible formats
      let content = "";
      let timestamp = Date.now() / 1000;

      if (typeof message === "string") {
        content = message;
      } else if (typeof message === "object") {
        // Handle different message object structures
        if (message.content) {
          content = message.content;
        } else if (message.message) {
          content = message.message;
        } else if (Array.isArray(message) && message.length > 0) {
          // Handle array format if present
          content = message[0];
        }

        // Extract timestamp if available
        timestamp = message.timestamp || message.created_at || timestamp;
      }

      // Generate a stable ID for the message
      const cacheKey = `${title}-${index}-${content.substring(0, 20)}`;
      if (!messageIdsRef.current.has(cacheKey)) {
        messageIdsRef.current.set(cacheKey, `${title}-${index}-${Date.now()}`);
      }

      return {
        id: messageIdsRef.current.get(cacheKey) || `${title}-${index}`,
        content: content,
        timestamp: timestamp,
        is_final: message.is_final || false,
      };
    });
  }, [messages, title]);

  // Register messages for animation
  useEffect(() => {
    messagesWithIds.forEach((message) => {
      registerMessage(title, message.id, message.timestamp);
    });
  }, [messagesWithIds, registerMessage, title]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current && messagesWithIds.length > 0) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messagesWithIds.length]);

  // Force re-render when messages array changes length
  useEffect(() => {
    setMessageUpdateTrigger((prev) => prev + 1);
  }, [messages.length]);

  // Extract coin pair from agent messages to get the right price
  const coinPair = useMemo(() => {
    // Try to find the coin pair in messages
    const pairRegex = /([A-Z]{3,4})\/USD/i;
    for (const message of messages) {
      const content = typeof message === "string" ? message : message.content;
      const match = content?.match?.(pairRegex);
      if (match && match[1]) {
        return match[1] + "USD";
      }
    }
    return "BTCUSD"; // Default fallback
  }, [messages]);

  // Get current market price from Binance context
  const { prices } = useBinanceData();
  const currentMarketPrice = prices[coinPair];

  // Convert string messages to Message objects
  const convertToMessageArray = (
    messages?: (string | Message)[]
  ): Message[] => {
    if (!messages) return [];

    return messages.map((msg, index) => {
      if (typeof msg === "string") {
        return {
          id: `${title}-${index}-${Date.now()}`,
          agent: title,
          content: msg,
          timestamp: Date.now() / 1000,
          is_final: true,
        };
      }
      return msg;
    });
  };

  // Convert all message arrays
  const processedMessages: Message[] = convertToMessageArray(messages);
  const processedTechnicalMessages: Message[] | undefined = technicalMessages
    ? convertToMessageArray(technicalMessages)
    : undefined;
  const processedCrowdMessages: Message[] | undefined = crowdMessages
    ? convertToMessageArray(crowdMessages)
    : undefined;

  // MessageItem component for detail view
  const MessageItem = ({
    message,
    isAnimating,
    isFinal,
  }: {
    message: MessageWithId;
    isAnimating: boolean;
    isFinal?: boolean;
  }) => (
    <div
      className={`p-3 rounded-lg ${
        isFinal
          ? "bg-accent-primary/20 text-content-primary"
          : "bg-background-tertiary/40 text-content-primary"
      }`}
    >
      <div
        className="message-content"
        dangerouslySetInnerHTML={{
          __html: parseMarkdown(message.content),
        }}
      />
      {message.timestamp && (
        <div className="text-xs text-content-tertiary mt-1">
          {new Date(message.timestamp * 1000).toLocaleTimeString()}
        </div>
      )}
    </div>
  );

  if (viewMode === "card") {
    return (
      <ColumnContainer>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{title} Agent</h3>
          <button
            onClick={toggleViewMode}
            className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-cyan-500 hover:to-amber-500 text-white text-sm rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
            Show Details
          </button>
        </div>

        {/* Display the prediction card */}
        <div className="mb-6">
          <AgentCardView
            key={`${title}-view-${messageUpdateTrigger}`}
            title={title}
            messages={processedMessages}
            isLoading={isLoading}
            currentMarketPrice={currentMarketPrice}
            targetDate={targetDate}
            contributorsData={getContributorsData()}
            technicalMessages={processedTechnicalMessages}
            crowdMessages={processedCrowdMessages}
          />
        </div>
      </ColumnContainer>
    );
  }

  // Detail view
  return (
    <ColumnContainer>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title} Agent</h3>
        <button
          onClick={toggleViewMode}
          className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-cyan-500 hover:to-amber-500 text-white text-sm rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          Show Card View
        </button>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-surface-start to-surface-end backdrop-blur-xl border border-indigo-500/30 overflow-hidden flex flex-col card-hover-glow relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-green-500/20 to-purple-600/30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/20 via-transparent to-orange-500/20 z-0"></div>

        <div className="p-4 bg-surface-glass relative z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <span className="text-xs text-content-tertiary">
              {messagesWithIds.length} messages
            </span>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[500px] custom-scrollbar relative bg-black/80 z-10"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <div className="animate-pulse flex space-x-1">
                <div className="h-2 w-2 bg-accent-primary rounded-full"></div>
                <div className="h-2 w-2 bg-accent-primary rounded-full animation-delay-200"></div>
                <div className="h-2 w-2 bg-accent-primary rounded-full animation-delay-400"></div>
              </div>
              <div className="text-content-tertiary">
                Analyzing {title} data...
              </div>
            </div>
          ) : messagesWithIds.length > 0 ? (
            <>
              {messagesWithIds.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isAnimating={isAnimating(title, message.id)}
                  isFinal={message.is_final}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-content-tertiary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-content-tertiary text-center">
                <p>No {title} messages available.</p>
                <p className="text-xs mt-1">
                  Try refreshing or starting a new analysis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ColumnContainer>
  );
}
