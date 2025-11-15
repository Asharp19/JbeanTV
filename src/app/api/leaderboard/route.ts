import prisma from "@/lib/db/prisma";
import { mockPredictions } from "@/lib/mock/leaderboard-data";
import { successResponse, errorFromException } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function GET() {
  try {
    // Check if we have any predictions
    const count = await prisma.prediction_leaderboard.count();

    // If no predictions exist, seed with mock data
    if (count === 0) {
      try {
        // Create the predictions with mock data
        await prisma.prediction_leaderboard.createMany({
          data: mockPredictions.map((pred) => ({
            id: pred._id,
            v: 0,
            pair: pred.pair,
            predictedAt: pred.predictedAt,
            predictedPrice: Number(pred.predictedPrice),
            targetDate: pred.targetDate,
            walletAddress: pred.walletAddress,
            walletType: pred.walletType,
          })),
        });
        console.log(`Successfully seeded ${mockPredictions.length} predictions`);
      } catch (seedError: any) {
        console.log("Error seeding predictions:", seedError.message);
      }
    }

    // Fetch all predictions after potential seeding
    const predictions = await prisma.prediction_leaderboard.findMany({
      orderBy: {
        predictedAt: "desc",
      },
    });

    return successResponse({
      predictions,
      count: predictions.length,
    });
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
