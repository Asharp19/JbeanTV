import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { validateParams } from "@/lib/api/validate-request";
import { coinpairSchema } from "@/lib/validations/coinpair.schema";
import { errorResponse, errorFromException, successResponse } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function GET(
  request: Request,
  { params }: { params: { coinpair: string } }
) {
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

    // Validate route parameters
    const validation = validateParams(params, coinpairSchema);
    if (!validation.success) {
      return validation.response;
    }

    const { coinpair } = validation.data;
    const coinpairMain = coinpair.replace("USD", "/USD");

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

    const predictions = (user.predictions as Record<string, any>)?.[coinpairMain] || [];

    // Return only predictions for the specified pair
    return successResponse({
      coinpair,
      predictions,
    });
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
