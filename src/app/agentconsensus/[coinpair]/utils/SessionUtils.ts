import { SessionData } from "../components/types";
import { purgeAllSessionData } from "./SessionCleaner";
import { getAnalysisData, saveAnalysisData } from "@/lib/utils/message-storage";

// Make convertedSessions globally accessible for cleanup
if (typeof window !== "undefined") {
  window.__convertedSessions = window.__convertedSessions || new Set();
}

// Track which sessions have been already converted to avoid repeated attempts
const convertedSessions =
  typeof window !== "undefined" && window.__convertedSessions
    ? window.__convertedSessions
    : new Set<string>();

/**
 * Get a cookie value with enhanced error handling
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR check

  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  } catch (e) {
    console.error("Error reading cookie:", e);
    return null;
  }
}

/**
 * Set a cookie with the specified expiration
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === "undefined") return; // SSR check

  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  } catch (e) {
    console.error("Error setting cookie:", e);
  }
}

/**
 * Get session data with circuit breaker to prevent loops
 */
export function getSessionData(coinpair: string): SessionData | null {
  const cookieKey = `analysis_session_${coinpair}`;

  // Try cookie first
  let sessionData = getCookie(cookieKey);
  let source = "cookie";

  // If not in cookie, try localStorage
  if (!sessionData) {
    try {
      sessionData = localStorage.getItem(cookieKey);
      source = "localStorage";
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }
  }

  if (!sessionData) return null;

  try {
    // First check if it's a plain UUID session ID (not JSON)
    if (
      sessionData.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      )
    ) {
      // Check if we've already tried to convert this session to avoid loops
      const sessionKey = `${coinpair}:${sessionData}`;

      if (convertedSessions.has(sessionKey)) {
        console.warn(
          `Already attempted to convert session ${sessionKey}, returning null to break loop`
        );

        // Try to aggressively clean up all data related to this session
        purgeAllSessionData(coinpair);

        return null;
      }

      console.log("Found legacy plain session ID format, creating new format");

      // Mark this session as already processed to prevent loops
      convertedSessions.add(sessionKey);

      // Create and immediately save the new format to avoid conversion on every load
      const newFormatData: SessionData = {
        id: sessionData,
        timestamp: Math.floor(Date.now() / 1000) - 3600,
        coinpair,
        status: "complete",
      };

      // Save the converted format for future use - with aggressive cleanup first
      purgeAllSessionData(coinpair);
      saveSessionData(coinpair, sessionData, "complete");

      return newFormatData;
    }

    // Try to parse as JSON
    const data = JSON.parse(sessionData);

    // Validate required fields
    if (!data.id || !data.timestamp || !data.coinpair) {
      console.warn(`Invalid session data from ${source}`);
      return null;
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (now - data.timestamp > 26 * 60 * 60) {
      console.log("Session expired (older than 26 hours)");
      return null;
    }

    return data;
  } catch (e) {
    console.error(`Error parsing session data from ${source}:`, e);
    return null;
  }
}

/**
 * Save session data with enhanced error handling
 */
export function saveSessionData(
  coinpair: string,
  sessionId: string,
  status?: "complete" | "in_progress"
): SessionData {
  const sessionData: SessionData = {
    id: sessionId,
    timestamp: Math.floor(Date.now() / 1000),
    coinpair,
    status,
  };

  const cookieKey = `analysis_session_${coinpair}`;

  // First clear any existing data to avoid conflicts
  try {
    localStorage.removeItem(cookieKey);
  } catch (e) {
    console.warn("Failed to clear localStorage:", e);
  }

  // Clear cookie too
  setCookie(cookieKey, "", -1); // Expires immediately

  // Save new data
  setCookie(cookieKey, JSON.stringify(sessionData), 2);

  try {
    localStorage.setItem(cookieKey, JSON.stringify(sessionData));
  } catch (e) {
    console.warn("Failed to save to localStorage:", e);
  }

  return sessionData;
}

/**
 * Update session status safely with fallback to message storage
 */
export function updateSessionStatus(
  coinpair: string,
  status: "complete" | "in_progress"
): void {
  const data = getSessionData(coinpair);

  if (data) {
    // Create a new object with updated status
    const updatedData = {
      ...data,
      status,
    };

    // Save complete updated object
    const cookieKey = `analysis_session_${coinpair}`;
    setCookie(cookieKey, JSON.stringify(updatedData), 2);

    try {
      localStorage.setItem(cookieKey, JSON.stringify(updatedData));
      console.log(`Session status updated to ${status} successfully`);
    } catch (e) {
      console.warn("Failed to update status in localStorage:", e);
    }
  } else {
    // If we can't find a valid session, create a new one with this status
    // This covers cases where the circuit breaker returned null
    console.log(
      `No valid session found, creating a new one with status ${status}`
    );

    const newSessionId = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    saveSessionData(coinpair, newSessionId, status);
  }

  // Also update the message storage status regardless of session state
  try {
    const analysisData = getAnalysisData(coinpair);
    if (analysisData) {
      saveAnalysisData(coinpair, analysisData.sessionId, analysisData.messages, status === "complete");
    }
  } catch (e) {
    console.warn("Could not update analysis data status:", e);
  }
}
