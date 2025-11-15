import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import { successResponse, errorFromException } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";
import { validateParams } from "@/lib/api/validate-request";
import { coinpairSchema } from "@/lib/validations/coinpair.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { coinpair: string } }
) {
  try {
    // Validate route parameters
    const validation = validateParams(params, coinpairSchema);
    if (!validation.success) {
      return validation.response;
    }

    const { coinpair } = validation.data;

    // Format the coinpair for querying (handle both formats)
    const formattedCoinPair = coinpair.replace(/USD$/, "/USD");

    // Find predictions that match the coin pair
    const predictionDocs = await prisma.predictions.findMany({
      where: {
        OR: [{ symbol: coinpair }, { symbol: formattedCoinPair }],
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    // Count next round predictions
    let totalNextRoundPredictions = 0;
    let allNextRoundPredictions: Array<{
      userId: string;
      high: number;
      low: number;
      close: number;
      coinpair: string;
    }> = [];

    for (const doc of predictionDocs) {
      // Access the JSON field for next round predictions
      const nextPreds = doc.NextRoundPredictions as Record<
        string,
        Record<
          string,
          {
            high: number;
            low: number;
            close: number;
          }
        >
      >;

      if (nextPreds) {
        // Count predictions by summing the number of users and their predictions
        Object.keys(nextPreds).forEach((userId) => {
          const userPreds = nextPreds[userId];
          const predsArray = Array.isArray(userPreds) ? userPreds : [userPreds];

          predsArray.forEach((pred) => {
            if (
              pred &&
              typeof pred.high === "number" &&
              typeof pred.low === "number" &&
              typeof pred.close === "number"
            ) {
              totalNextRoundPredictions++;
              allNextRoundPredictions.push({
                userId,
                ...pred,
                coinpair: doc.symbol,
              });
            }
          });
        });
      }
    }

    return successResponse({
      totalPredictions: totalNextRoundPredictions,
      predictions: allNextRoundPredictions,
      coinpair,
    });
  } catch (error) {
    console.error("Error fetching prediction counts:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
