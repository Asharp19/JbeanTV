/**
 * Custom hook for Agent Consensus Page logic (Refactored with React Query)
 */

import { useState, useCallback } from "react";
import {
  transformMessagesToStrings,
  hasMessages,
} from "@/lib/services/agent-message-service";
import { useAgentMessagesQuery } from "@/lib/query/hooks/use-agent-messages-query";
import { useHistoricalPredictionsQuery } from "@/lib/query/hooks/use-predictions-query";

export interface Notification {
  type: "success" | "error" | "info";
  message: string;
}

export function useAgentConsensusPage(coinpair: string) {
  const [showChat, setShowChat] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Use React Query for messages
  const {
    data: messages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useAgentMessagesQuery(coinpair);

  // Use React Query for historical predictions
  const {
    data: historicalPredictions,
    isLoading: historicalLoading,
    error: historicalError,
  } = useHistoricalPredictionsQuery(coinpair);

  const loading = messagesLoading || (messages && !hasMessages(messages));
  const error = messagesError?.message || historicalError?.message || null;

  const toggleChat = useCallback(() => {
    setShowChat((prev) => !prev);
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const getMessageStrings = useCallback(() => {
    if (!messages) {
      return { CEO: [], TechnicalAnalyst: [], CrowdAnalyst: [] };
    }
    return transformMessagesToStrings(messages);
  }, [messages]);

  const handleError = useCallback((error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(errorMessage);
  }, []);

  return {
    loading,
    messages: messages || {
      CEO: [],
      TechnicalAnalyst: [],
      CrowdAnalyst: [],
      targetDate: "",
    },
    error,
    showChat,
    notification,
    historicalPredictions: historicalPredictions || [],
    historicalLoading,
    toggleChat,
    closeNotification,
    getMessageStrings,
    handleError,
  };
}
