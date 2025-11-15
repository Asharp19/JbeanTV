/**
 * Body Size Limit Middleware
 * Prevents DOS attacks via large payloads
 */

import { NextRequest } from "next/server";
import { errorResponse } from "../response-wrapper";
import { ERROR_CODES } from "../error-codes";

interface BodySizeLimitOptions {
  maxSizeBytes?: number; // Default 1MB
}

/**
 * Middleware to enforce request body size limits
 */
export function withBodySizeLimit(
  options: BodySizeLimitOptions = { maxSizeBytes: 1024 * 1024 } // 1MB default
) {
  return async function (
    request: NextRequest,
    handler: (request: NextRequest, context?: any) => Promise<Response>,
    context?: any
  ) {
    const maxSize = options.maxSizeBytes || 1024 * 1024;

    // Check Content-Length header if present
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > maxSize) {
      return errorResponse(
        ERROR_CODES.BAD_REQUEST,
        `Request body too large. Maximum size: ${maxSize} bytes`,
        413
      );
    }

    // For streaming bodies, we need to check during consumption
    // This is handled by Next.js/Node.js layer, but we add header check as first line of defense

    return handler(request, context);
  };
}

