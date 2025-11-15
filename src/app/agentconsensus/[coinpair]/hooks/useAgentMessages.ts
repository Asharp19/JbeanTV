import { useState, useEffect, useRef } from "react";
import { LegacyAgentMessages } from "../components/types";

export function useAgentMessages(coinpair: string, loading: boolean) {
  const [messages, setMessages] = useState<LegacyAgentMessages>({
    CEO: [],
    TechnicalAnalyst: [],
    CrowdAnalyst: [],
    targetDate: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    let pollCount = 0;
    const maxPolls = 6; // Stop polling after 30 seconds (6 * 5s)

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/agent-messages/${coinpair}`, {
          signal: abortController.signal,
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        // Check for response type and handle non-JSON responses
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response:", await response.text());
          return;
        }

        const result = await response.json();

        // Handle both wrapped and unwrapped responses
        const messagesData =
          result.success && result.data?.messages
            ? result.data.messages
            : result.messages;

        if (response.ok && messagesData) {
          // Ensure all message arrays are initialized
          const safeMessages = {
            CEO: Array.isArray(messagesData.CEO) ? messagesData.CEO : [],
            TechnicalAnalyst: Array.isArray(messagesData.TechnicalAnalyst)
              ? messagesData.TechnicalAnalyst
              : [],
            CrowdAnalyst: Array.isArray(messagesData.CrowdAnalyst)
              ? messagesData.CrowdAnalyst
              : [],
            targetDate: messagesData.targetDate || "",
          };

          console.log("Target date in messages:", messagesData.targetDate);

          setMessages(safeMessages);

          // Only set loading to false if we have messages
          const hasMessages =
            safeMessages.CEO.length > 0 ||
            safeMessages.TechnicalAnalyst.length > 0 ||
            safeMessages.CrowdAnalyst.length > 0;

          return hasMessages;
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Message fetch aborted");
        } else {
          console.error("Error fetching messages:", error);
          throw error;
        }
      }
      return false;
    };

    // Initial fetch
    fetchMessages();

    // Poll for messages every 5 seconds while loading
    const intervalId = setInterval(() => {
      if (loading && pollCount < maxPolls) {
        pollCount++;
        fetchMessages();
      } else if (pollCount >= maxPolls) {
        // Stop polling after max attempts
        clearInterval(intervalId);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
      abortController.abort();
    };
  }, [coinpair, loading]);

  return { messages, setMessages };
}

