import { AgentMessages } from "@/lib/types/agency";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { SessionData } from "@/app/agentconsensus/[coinpair]/components/types";

// Define storage keys
const SESSION_ID_KEY_PREFIX = "analysis_session_";
const MESSAGE_DATA_KEY_PREFIX = "analysis_messages_";

// Storage format
interface StoredAnalysisData {
  sessionId: string;
  timestamp: number; // Unix timestamp in seconds
  coinpair: string;
  messages: AgentMessages;
  complete: boolean;
}

/**
 * Saves the complete analysis data to localStorage
 */
export function saveAnalysisData(
  coinpair: string,
  sessionId: string,
  messages: AgentMessages,
  complete: boolean = false
): void {
  const data: StoredAnalysisData = {
    sessionId,
    timestamp: Math.floor(Date.now() / 1000),
    coinpair,
    messages,
    complete,
  };

  try {
    // Store session reference (small size, can go in cookie)
    const sessionKey = `${SESSION_ID_KEY_PREFIX}${coinpair}`;
    document.cookie = `${sessionKey}=${sessionId};path=/;max-age=${
      26 * 60 * 60
    }`;

    // Store full message data in localStorage (larger size)
    const storageKey = `${MESSAGE_DATA_KEY_PREFIX}${coinpair}`;

    // Compress data to save space
    const compressedData = compressToUTF16(JSON.stringify(data));
    localStorage.setItem(storageKey, compressedData);

    console.log(
      `Saved ${coinpair} analysis data (${compressedData.length} chars compressed)`
    );
  } catch (error) {
    console.error("Failed to save analysis data:", error);
  }
}

/**
 * Retrieves analysis data if available and not expired
 */
export function getAnalysisData(coinpair: string): StoredAnalysisData | null {
  try {
    const storageKey = `${MESSAGE_DATA_KEY_PREFIX}${coinpair}`;
    const compressedData = localStorage.getItem(storageKey);

    if (!compressedData) {
      console.log(`No stored analysis found for ${coinpair}`);
      return null;
    }

    // Decompress and parse data
    const decompressed = decompressFromUTF16(compressedData);
    if (!decompressed) {
      console.warn(`Failed to decompress data for ${coinpair}`);
      return null;
    }

    const data: StoredAnalysisData = JSON.parse(decompressed);

    // Check if data is expired (older than 26 hours)
    const now = Math.floor(Date.now() / 1000);
    const dataAge = now - data.timestamp;
    const maxAge = 26 * 60 * 60; // 26 hours in seconds

    if (dataAge > maxAge) {
      console.log(
        `Analysis data for ${coinpair} is expired (${Math.floor(
          dataAge / 3600
        )} hours old)`
      );
      clearAnalysisData(coinpair);
      return null;
    }

    console.log(
      `Retrieved valid analysis data for ${coinpair} (${Math.floor(
        dataAge / 60
      )} minutes old)`
    );
    return data;
  } catch (error) {
    console.error(`Error retrieving analysis data for ${coinpair}:`, error);
    return null;
  }
}

/**
 * Updates the stored analysis data with new messages
 */
export function updateAnalysisData(
  coinpair: string,
  messages: AgentMessages,
  complete: boolean = false
): boolean {
  try {
    const data = getAnalysisData(coinpair);
    if (!data) return false;

    // Merge new messages with existing ones
    const updatedMessages: AgentMessages = {
      CEO: [...data.messages.CEO, ...messages.CEO],
      TechnicalAnalyst: [
        ...data.messages.TechnicalAnalyst,
        ...messages.TechnicalAnalyst,
      ],
      CrowdAnalyst: [...data.messages.CrowdAnalyst, ...messages.CrowdAnalyst],
      targetDate: messages.targetDate || data.messages.targetDate || "",
    };

    // De-duplicate messages by id
    for (const agent in updatedMessages) {
      // Skip targetDate, only process agent message arrays
      if (agent === "targetDate") continue;

      // Type guard - ensure we only process valid agent keys
      if (
        agent === "CEO" ||
        agent === "TechnicalAnalyst" ||
        agent === "CrowdAnalyst"
      ) {
        const uniqueMessages = new Map();
        updatedMessages[agent].forEach((msg) => {
          if (msg.id) {
            uniqueMessages.set(msg.id, msg);
          }
        });
        updatedMessages[agent] = Array.from(uniqueMessages.values());
      }
    }

    // Save the updated data
    saveAnalysisData(coinpair, data.sessionId, updatedMessages, complete);
    return true;
  } catch (error) {
    console.error(`Error updating analysis data for ${coinpair}:`, error);
    return false;
  }
}

/**
 * Clears analysis data for a specific coin pair
 */
export function clearAnalysisData(coinpair: string): void {
  try {
    const sessionKey = `${SESSION_ID_KEY_PREFIX}${coinpair}`;
    const storageKey = `${MESSAGE_DATA_KEY_PREFIX}${coinpair}`;

    // Clear cookie
    document.cookie = `${sessionKey}=;path=/;max-age=0`;

    // Clear localStorage
    localStorage.removeItem(storageKey);

    console.log(`Cleared analysis data for ${coinpair}`);
  } catch (error) {
    console.error(`Error clearing analysis data for ${coinpair}:`, error);
  }
}

// Add this function to properly handle session ID conversion when retrieving data
export function getOrCreateSessionData(
  coinpair: string,
  sessionId?: string
): SessionData | null {
  // First check for existing data
  let data = getAnalysisData(coinpair);

  // If we have data and a session ID, make sure they match
  if (data && sessionId && data.sessionId !== sessionId) {
    console.log(
      `Updating stored session ID from ${data.sessionId} to ${sessionId}`
    );
    data.sessionId = sessionId;

    // If we have message data, update the storage
    if (data.messages) {
      saveAnalysisData(coinpair, sessionId, data.messages, data.complete);
    }
  }

  // If we have no data but have a session ID, create a new entry
  if (!data && sessionId) {
    console.log(
      `Creating new session data entry for ${coinpair} with ID ${sessionId}`
    );
    data = {
      sessionId,
      timestamp: Math.floor(Date.now() / 1000),
      coinpair,
      messages: {
        CEO: [],
        TechnicalAnalyst: [],
        CrowdAnalyst: [],
        targetDate: "",
      },
      complete: false,
    };

    // Save this minimal structure to ensure we have a record
    saveAnalysisData(coinpair, sessionId, data.messages, false);
  }

  // Convert StoredAnalysisData to SessionData before returning
  if (data) {
    return {
      id: data.sessionId,
      timestamp: data.timestamp,
      coinpair: data.coinpair,
      status: data.complete ? "complete" : "in_progress",
    };
  }

  return data;
}
