/**
 * Agent Message Service - Handles agent message operations
 */

import { fetchJson, NO_CACHE_HEADERS } from "./api-client";
import { API_ENDPOINTS } from "../api/endpoints";

export interface AgentMessage {
  content: string;
  timestamp?: string;
  role?: string;
}

export interface LegacyAgentMessages {
  CEO: (string | AgentMessage)[];
  TechnicalAnalyst: (string | AgentMessage)[];
  CrowdAnalyst: (string | AgentMessage)[];
  targetDate: string;
}

export interface AgentMessagesResponse {
  messages: LegacyAgentMessages;
  success?: boolean;
}

/**
 * Fetch agent messages for a coin pair
 */
export async function fetchAgentMessages(
  coinpair: string
): Promise<LegacyAgentMessages> {
  try {
    const data = await fetchJson<AgentMessagesResponse>(
      API_ENDPOINTS.agentMessages(coinpair),
      {
        cache: "no-store",
        headers: NO_CACHE_HEADERS,
      }
    );

    if (data.messages) {
      return sanitizeAgentMessages(data.messages);
    }

    return createEmptyMessages();
  } catch (error) {
    console.error("Error fetching agent messages:", error);
    throw error;
  }
}

/**
 * Sanitize agent messages to ensure all arrays are initialized
 */
function sanitizeAgentMessages(
  messages: Partial<LegacyAgentMessages>
): LegacyAgentMessages {
  return {
    CEO: Array.isArray(messages.CEO) ? messages.CEO : [],
    TechnicalAnalyst: Array.isArray(messages.TechnicalAnalyst)
      ? messages.TechnicalAnalyst
      : [],
    CrowdAnalyst: Array.isArray(messages.CrowdAnalyst)
      ? messages.CrowdAnalyst
      : [],
    targetDate: messages.targetDate || "",
  };
}

/**
 * Create empty messages structure
 */
function createEmptyMessages(): LegacyAgentMessages {
  return {
    CEO: [],
    TechnicalAnalyst: [],
    CrowdAnalyst: [],
    targetDate: "",
  };
}

/**
 * Check if messages contain any content
 */
export function hasMessages(messages: LegacyAgentMessages): boolean {
  return (
    messages.CEO.length > 0 ||
    messages.TechnicalAnalyst.length > 0 ||
    messages.CrowdAnalyst.length > 0
  );
}

/**
 * Transform messages to string format
 */
export function transformMessagesToStrings(messages: LegacyAgentMessages): {
  CEO: string[];
  TechnicalAnalyst: string[];
  CrowdAnalyst: string[];
} {
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

