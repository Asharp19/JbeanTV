/**
 * API Client - Centralized HTTP request handling
 */

export interface FetchConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Enhanced fetch with timeout, retry logic, and error handling
 */
export async function fetchWithConfig(
  url: string,
  config: FetchConfig = {}
): Promise<Response> {
  const {
    timeout = 5000,
    retries = 0,
    retryDelay = 2000,
    ...fetchOptions
  } = config;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `API responded with status: ${response.status}`,
          response.status,
          response
        );
      }

      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Unknown error");

      if (attempt < retries) {
        await sleep(retryDelay);
      }
    }
  }

  throw lastError || new Error("Request failed");
}

/**
 * Fetch and parse JSON response
 */
export async function fetchJson<T = any>(
  url: string,
  config: FetchConfig = {}
): Promise<T> {
  const response = await fetchWithConfig(url, {
    ...config,
    headers: {
      Accept: "application/json",
      ...config.headers,
    },
  });

  return response.json();
}

/**
 * POST request with JSON body
 */
export async function postJson<T = any>(
  url: string,
  data: any,
  config: FetchConfig = {}
): Promise<T> {
  const response = await fetchWithConfig(url, {
    ...config,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.headers,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Utility to sleep for delay milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Cache control headers for no-cache requests
 */
export const NO_CACHE_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

