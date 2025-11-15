import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { errorResponse, errorFromException, successResponse } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function GET(request: Request) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return errorResponse(
        ERROR_CODES.AUTH_UNAUTHORIZED,
        "Authentication required",
        401
      );
    }

    // The URL parameter for filtering by pair
    const url = new URL(request.url);

    // Extract coinpair from path if present (e.g., /api/personal-predictions/BTC-USD)
    const pathParts = url.pathname.split("/");
    const pairFromPath = pathParts[pathParts.length - 1];

    // Check if the last path segment is not "personal-predictions" (meaning it's a coinpair)
    const pair =
      pathParts[pathParts.length - 1] !== "personal-predictions"
        ? pairFromPath
        : url.searchParams.get("pair"); // Fallback to query param

    // Skip DateTime fields to avoid parsing issues
    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        predictions: true,
      },
    });

    if (!user) {
      return errorResponse(
        ERROR_CODES.DB_NOT_FOUND,
        "User not found",
        404
      );
    }

    if (pair && user.predictions) {
      // Return only predictions for the specified pair
      return successResponse({
        predictions: (user.predictions as Record<string, any>)[pair] || [],
      });
    }

    // Return all predictions
    return successResponse({
      predictions: user.predictions || {},
    });
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
