import { LegacyAgentMessages } from "../components/types";

/**
 * Validates if a coinpair string follows the expected format (e.g., BTCUSD, ETHUSD)
 */
export function validateCoinPair(coinpair: string): boolean {
  return /^([A-Z]+)USD$/.test(coinpair);
}

/**
 * Transforms messages to extract string content for ActionButtons component
 */
export function getMessageStrings(messages: LegacyAgentMessages) {
  return {
    CEO: messages.CEO.map((msg) =>
      typeof msg === "string" ? msg : msg.content || ""
    ),
    TechnicalAnalyst: messages.TechnicalAnalyst.map((msg) =>
      typeof msg === "string" ? msg : msg.content || ""
    ),
    CrowdAnalyst: messages.CrowdAnalyst.map((msg) =>
      typeof msg === "string" ? msg : msg.content || ""
    ),
  };
}

/**
 * Helper to handle errors consistently
 */
export function handleError(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

