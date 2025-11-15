import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import { successResponse, errorFromException } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function GET(request: NextRequest) {
  try {
    // Use Prisma to count the number of predictions
    const totalPredictions = await prisma.predictions.count();

    // Use standard values for other statistics
    const rewardPool = "$90,000";
    const currentStreak = 587;

    return successResponse({
      totalPredictions,
      rewardPool,
      currentStreak,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
