/**
 * Rate Limiting Middleware
 */

import { NextRequest } from "next/server";
import { errorResponse } from "../response-wrapper";
import { ERROR_CODES } from "../error-codes";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production)
const rateLimitStore: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, 5 * 60 * 1000);

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (request: NextRequest) => string;
}

export function withRateLimit(
  options: RateLimitOptions = { maxRequests: 100, windowMs: 60000 }
) {
  return async function (
    request: NextRequest,
    handler: (request: NextRequest, context?: any) => Promise<Response>,
    context?: any
  ) {
    // Generate key (default: IP address)
    const key =
      options.keyGenerator?.(request) ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const record = rateLimitStore[key];

    // Initialize or reset if window expired
    if (!record || record.resetTime < now) {
      rateLimitStore[key] = {
        count: 1,
        resetTime: now + options.windowMs,
      };
      return handler(request, context);
    }

    // Increment count
    record.count++;

    // Check if limit exceeded
    if (record.count > options.maxRequests) {
      const resetIn = Math.ceil((record.resetTime - now) / 1000);
      return errorResponse(
        ERROR_CODES.RATE_LIMIT_EXCEEDED,
        `Rate limit exceeded. Try again in ${resetIn} seconds`,
        429
      );
    }

    return handler(request, context);
  };
}

/**
 * Strict rate limit for mutation endpoints
 */
export const withStrictRateLimit = withRateLimit({
  maxRequests: 10,
  windowMs: 60000, // 10 requests per minute
});

/**
 * Lenient rate limit for read endpoints
 */
export const withLenientRateLimit = withRateLimit({
  maxRequests: 100,
  windowMs: 60000, // 100 requests per minute
});

