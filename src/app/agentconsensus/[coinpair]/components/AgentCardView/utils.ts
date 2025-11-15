import { Message } from "../types";
import { useMemo } from "react";
import { formatDisplayTargetDate as formatDate } from "@/lib/utils";

// Re-export for use in components
export { formatDate as formatDisplayTargetDate };

/**
 * Creates a memoized version of extractPriceData to prevent recalculation
 * when the same messages are passed repeatedly.
 */
export function useExtractPriceData(
  messages: Message[],
  currentMarketPrice?: number
) {
  return useMemo(() => {
    return extractPriceData(messages, currentMarketPrice);
  }, [messages, currentMarketPrice]);
}

/**
 * Creates a memoized version of formatDisplayTargetDate to prevent recalculation
 * when the same date string is passed repeatedly.
 */
export function useFormatDisplayTargetDate(dateString?: string) {
  return useMemo(() => {
    return formatDate(dateString);
  }, [dateString]);
}

// The base implementation remains the same but exported as a named function
export function extractPriceData(
  messages: Message[],
  currentMarketPrice?: number
) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  const latestMessage = messages[messages.length - 1];

  if (!latestMessage) return null;

  let content = "";
  if (typeof latestMessage === "string") {
    content = latestMessage;
  } else if (typeof latestMessage === "object") {
    content = latestMessage.content || "";
  }

  if (!content) {
    return null;
  }

  // Extract numeric values with even more flexible patterns
  const highMatch = content.match(
    /(?:high|High|Expected High):\s*\$?(\d+(?:\.\d+)?)/i
  );
  const lowMatch = content.match(
    /(?:low|Low|Expected Low):\s*\$?(\d+(?:\.\d+)?)/i
  );
  const closeMatch = content.match(
    /(?:close|Close|target|Expected Close):\s*\$?(\d+(?:\.\d+)?)/i
  );

  // More flexible patterns for sections
  const contributorsSection = content
    .match(
      /(?:LEADING CONTRIBUTORS:|Contributors:|0x[a-f0-9]+)[\s\S]+?(?=(?:\n\n|\n(?:ANALYSIS|SUMMARY|High|Low|Close|##|$)))/i
    )?.[0]
    ?.trim();

  const analysisSummary = content
    .match(
      /(?:ANALYSIS SUMMARY:|TECHNICAL REASONING:|Analysis:|SUMMARY:)[\s\S]+?(?=(?:\n\n|\n(?:LEADING|Contributors|High|Low|Close|##|$)))/i
    )?.[0]
    ?.trim();

  // Extract sentiment with more context
  const sentiment = content.toLowerCase().includes("bullish")
    ? "BULLISH"
    : content.toLowerCase().includes("bearish")
    ? "BEARISH"
    : "NEUTRAL";

  return {
    high: highMatch ? parseFloat(highMatch[1] || highMatch[2]) : null,
    low: lowMatch ? parseFloat(lowMatch[1] || lowMatch[2]) : null,
    close: closeMatch ? parseFloat(closeMatch[1] || closeMatch[2]) : null,
    contributors: contributorsSection,
    analysis: analysisSummary,
    sentiment,
  };
}
