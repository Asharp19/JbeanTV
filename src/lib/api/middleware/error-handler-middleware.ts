/**
 * Error Handler Middleware
 */

import { NextRequest } from "next/server";
import { errorFromException } from "../response-wrapper";
import { ERROR_CODES } from "../error-codes";
import { logger } from "@/lib/logging/logger";

export async function withErrorHandler(
  request: NextRequest,
  handler: (request: NextRequest, context?: any) => Promise<Response>,
  context?: any
) {
  try {
    return await handler(request, context);
  } catch (error) {
    // Log the error
    logger.error(
      "Unhandled error in API route",
      error instanceof Error ? error : undefined,
      {
        route: request.nextUrl.pathname,
        method: request.method,
      }
    );

    // Return standardized error response
    return errorFromException(error, ERROR_CODES.INTERNAL_ERROR);
  }
}

