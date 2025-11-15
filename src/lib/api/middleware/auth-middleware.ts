/**
 * Authentication Middleware
 */

import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { errorResponse } from "../response-wrapper";
import { ERROR_CODES } from "../error-codes";

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, context?: any) => Promise<Response>,
  context?: any
) {
  try {
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return errorResponse(
        ERROR_CODES.AUTH_UNAUTHORIZED,
        "Authentication required",
        401
      );
    }

    // Attach user info to request (can be accessed in handler)
    (request as any).user = {
      id: token.id,
      email: token.email,
    };

    return handler(request, context);
  } catch (error) {
    console.error("Auth middleware error:", error);
    return errorResponse(
      ERROR_CODES.AUTH_SESSION_EXPIRED,
      "Session expired or invalid",
      401
    );
  }
}

/**
 * Optional auth - doesn't require authentication but provides user if available
 */
export async function withOptionalAuth(
  request: NextRequest,
  handler: (request: NextRequest, context?: any) => Promise<Response>,
  context?: any
) {
  try {
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      (request as any).user = {
        id: token.id,
        email: token.email,
      };
    }

    return handler(request, context);
  } catch (error) {
    // Don't fail on optional auth errors
    return handler(request, context);
  }
}

