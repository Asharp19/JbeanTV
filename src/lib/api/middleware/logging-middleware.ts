/**
 * Logging Middleware
 */

import { NextRequest } from "next/server";
import { createApiLogger } from "@/lib/logging/logger";

export async function withLogging(
  request: NextRequest,
  handler: (request: NextRequest, context?: any) => Promise<Response>,
  context?: any
) {
  const startTime = Date.now();
  const { pathname, search } = request.nextUrl;
  const method = request.method;
  
  const logger = createApiLogger(pathname, method);

  // Log incoming request
  logger.info("Incoming request", {
    url: `${pathname}${search}`,
    headers: Object.fromEntries(request.headers.entries()),
    userAgent: request.headers.get("user-agent"),
  });

  try {
    // Execute handler
    const response = await handler(request, context);
    
    // Log response
    const duration = Date.now() - startTime;
    logger.info("Request completed", {
      status: response.status,
      duration: `${duration}ms`,
    });

    // Add response time header
    response.headers.set("X-Response-Time", `${duration}ms`);

    return response;
  } catch (error) {
    // Log error
    const duration = Date.now() - startTime;
    logger.error(
      "Request failed",
      error instanceof Error ? error : undefined,
      {
        duration: `${duration}ms`,
      }
    );
    throw error;
  }
}

