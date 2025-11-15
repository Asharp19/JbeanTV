import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { validateParams } from "@/lib/api/validate-request";
import { z } from "zod";

const userIdSchema = z.object({
  userId: z.string().min(1),
});

interface PredictionData {
  high: number;
  low: number;
  close: number;
  timestamp?: any;
  confidence?: number;
}

interface Prediction {
  _id: string;
  coinpair: string;
  symbol: string;
  high: number;
  low: number;
  close: number;
  timestamp: any;
  status: string;
  userId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Validate route parameters
    const paramsValidation = validateParams(params, userIdSchema);
    if (!paramsValidation.success) {
      return paramsValidation.response;
    }

    const { userId } = paramsValidation.data;

    // Verify the user ID matches the authenticated user
    const decodedUserId = decodeURIComponent(userId);
    if (decodedUserId !== session.user.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: User ID mismatch" },
        { status: 403 }
      );
    }

    // Find all prediction documents
    const predictionDocs = await prisma.predictions.findMany({
      orderBy: {
        lastUpdated: "desc",
      },
    });

    // Initialize predictions grouped by coin pair
    const predictionsByCoinPair: Record<string, Prediction[]> = {};

    // Process predictions to extract user data across all coin pairs
    for (const doc of predictionDocs) {
      const symbol = doc.symbol || "Unknown";
      const displaySymbol = symbol.includes("/")
        ? symbol
        : `${symbol.replace("USD", "")}/USD`;

      // Access the JSON fields for current and next predictions
      const currentPreds = doc.CurrentPredictions as Record<string, any>;
      const nextPreds = doc.NextRoundPredictions as Record<string, any>;

      const coinPairPredictions: Prediction[] = [];

      // Extract current round predictions
      if (currentPreds && currentPreds[decodedUserId]) {
        const userPreds = currentPreds[decodedUserId];
        const predsArray = Array.isArray(userPreds) ? userPreds : [userPreds];

        predsArray.forEach((pred: PredictionData, index: number) => {
          if (
            pred &&
            typeof pred.high === "number" &&
            typeof pred.low === "number" &&
            typeof pred.close === "number"
          ) {
            coinPairPredictions.push({
              _id: `${doc.id}_current_${index}`,
              coinpair: symbol,
              symbol: displaySymbol,
              high: pred.high,
              low: pred.low,
              close: pred.close,
              timestamp: pred.timestamp || doc.lastUpdated,
              status: "current",
              userId: decodedUserId,
            });
          }
        });
      }

      // Extract next round predictions
      if (nextPreds && nextPreds[decodedUserId]) {
        const userPreds = nextPreds[decodedUserId];
        const predsArray = Array.isArray(userPreds) ? userPreds : [userPreds];

        predsArray.forEach((pred: PredictionData, index: number) => {
          if (
            pred &&
            typeof pred.high === "number" &&
            typeof pred.low === "number" &&
            typeof pred.close === "number"
          ) {
            coinPairPredictions.push({
              _id: `${doc.id}_next_${index}`,
              coinpair: symbol,
              symbol: displaySymbol,
              high: pred.high,
              low: pred.low,
              close: pred.close,
              timestamp: pred.timestamp || doc.lastUpdated,
              status: "next",
              userId: decodedUserId,
            });
          }
        });
      }

      // Add to grouped predictions if any found for this coin pair
      if (coinPairPredictions.length > 0) {
        // Sort by timestamp
        coinPairPredictions.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return timeB - timeA;
        });

        predictionsByCoinPair[symbol] = coinPairPredictions;
      }
    }

    // Return the grouped predictions
    return NextResponse.json({
      success: true,
      predictions: predictionsByCoinPair,
    });
  } catch (error) {
    console.error("[user-predictions/all] Error fetching user predictions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}

