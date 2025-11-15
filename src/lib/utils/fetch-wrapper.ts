/**
 * Fetch wrapper with request deduplication and caching
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface PendingRequest<T> {
  promise: Promise<T>;
  timestamp: number;
}

class FetchCache {
  private cache = new Map<string, CacheEntry<any>>();
  private pendingRequests = new Map<string, PendingRequest<any>>();
  private readonly defaultTTL = 60000; // 60 seconds default TTL

  /**
   * Generate cache key from URL and options
   */
  private getCacheKey(url: string, options?: RequestInit): string {
    const method = options?.method || "GET";
    const body = options?.body ? JSON.stringify(options.body) : "";
    return `${method}:${url}:${body}`;
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry<any>): boolean {
    return Date.now() < entry.expiresAt;
  }

  /**
   * Get cached data if available and valid
   */
  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && this.isValid(entry)) {
      return entry.data;
    }
    if (entry) {
      this.cache.delete(key);
    }
    return null;
  }

  /**
   * Set cache entry
   */
  private setCache<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    this.cache.forEach((entry, key) => {
      if (now >= entry.expiresAt) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Clean up stale pending requests (older than 30 seconds)
   */
  private cleanupPending(): void {
    const now = Date.now();
    const staleThreshold = 30000; // 30 seconds
    const keysToDelete: string[] = [];
    this.pendingRequests.forEach((pending, key) => {
      if (now - pending.timestamp > staleThreshold) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.pendingRequests.delete(key));
  }

  /**
   * Fetch with caching and deduplication
   */
  async fetch<T = any>(
    url: string,
    options?: RequestInit & { ttl?: number; skipCache?: boolean }
  ): Promise<T> {
    const { ttl = this.defaultTTL, skipCache = false, ...fetchOptions } = options || {};
    const cacheKey = this.getCacheKey(url, fetchOptions);

    // Check cache first (if not skipped)
    if (!skipCache) {
      const cached = this.getCached<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    // Check if there's already a pending request for this URL
    const pending = this.pendingRequests.get(cacheKey);
    if (pending) {
      return pending.promise;
    }

    // Create new request
    const promise = (async () => {
      try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache the result
        if (!skipCache) {
          this.setCache(cacheKey, data, ttl);
        }

        return data;
      } finally {
        // Remove from pending requests
        this.pendingRequests.delete(cacheKey);
      }
    })();

    // Store as pending
    this.pendingRequests.set(cacheKey, {
      promise,
      timestamp: Date.now(),
    });

    // Periodic cleanup
    if (Math.random() < 0.1) {
      this.cleanupExpired();
      this.cleanupPending();
    }

    return promise;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  /**
   * Clear cache for specific URL pattern
   */
  clearPattern(pattern: string | RegExp): void {
    const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
    const keysToDelete: string[] = [];
    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: Date.now() - entry.timestamp,
        ttl: entry.expiresAt - Date.now(),
      })),
    };
  }
}

// Singleton instance
const fetchCache = new FetchCache();

/**
 * Enhanced fetch with caching and deduplication
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options plus caching options
 * @returns Promise with the response data
 * 
 * @example
 * // Cache for 60 seconds (default)
 * const data = await cachedFetch('/api/data');
 * 
 * @example
 * // Cache for 5 minutes
 * const data = await cachedFetch('/api/data', { ttl: 300000 });
 * 
 * @example
 * // Skip cache
 * const data = await cachedFetch('/api/data', { skipCache: true });
 */
export async function cachedFetch<T = any>(
  url: string,
  options?: RequestInit & { ttl?: number; skipCache?: boolean }
): Promise<T> {
  return fetchCache.fetch<T>(url, options);
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  fetchCache.clear();
}

/**
 * Clear cached data matching a pattern
 */
export function clearCachePattern(pattern: string | RegExp): void {
  fetchCache.clearPattern(pattern);
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return fetchCache.getStats();
}

export default cachedFetch;

