/**
 * Utility to completely purge all session data for a coin pair
 * to resolve persistent legacy session format issues
 */

// Add this type declaration at the top of the file
declare global {
  interface Window {
    __convertedSessions?: Set<string>;
  }
}

export function purgeAllSessionData(coinpair: string): void {
  console.log(`Purging all session data for ${coinpair}...`);

  // 1. Clear localStorage entry
  const localStorageKey = `analysis_session_${coinpair}`;
  try {
    localStorage.removeItem(localStorageKey);
    console.log(`Cleared localStorage for ${localStorageKey}`);
  } catch (e) {
    console.warn(`Failed to clear localStorage for ${localStorageKey}:`, e);
  }

  // 2. Clear cookie entry with multiple approaches
  try {
    // Approach 1: Direct expiration
    document.cookie = `${localStorageKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Approach 2: Empty with path
    document.cookie = `${localStorageKey}=; path=/;`;

    // Approach 3: Set max-age to 0
    document.cookie = `${localStorageKey}=; max-age=0; path=/;`;

    console.log(`Cleared cookies for ${localStorageKey}`);
  } catch (e) {
    console.warn(`Failed to clear cookies for ${localStorageKey}:`, e);
  }

  // 3. Also clear analysis data storage
  try {
    const analysisStorageKey = `analysis_data_${coinpair}`;
    localStorage.removeItem(analysisStorageKey);
    console.log(
      `Cleared analysis data from localStorage for ${analysisStorageKey}`
    );
  } catch (e) {
    console.warn(`Failed to clear analysis data for ${coinpair}:`, e);
  }

  // 4. Clear any session tracking
  try {
    // Clear any entries in the converted sessions set that relate to this coinpair
    if (typeof window !== "undefined" && window.__convertedSessions) {
      const keysToRemove: string[] = [];
      window.__convertedSessions.forEach((key) => {
        if (key.startsWith(`${coinpair}:`)) {
          keysToRemove.push(key);
        }
      });

      keysToRemove.forEach((key) => {
        window.__convertedSessions?.delete(key);
      });

      console.log(`Cleared ${keysToRemove.length} session tracking entries`);
    }
  } catch (e) {
    console.warn("Failed to clear session tracking:", e);
  }

  console.log(`All session data for ${coinpair} has been purged`);
}
