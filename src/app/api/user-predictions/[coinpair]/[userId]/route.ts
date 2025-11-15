import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { validateParams, validateQuery } from "@/lib/api/validate-request";
import {
  userPredictionParamsSchema,
  checkSubmissionQuerySchema,
} from "@/lib/validations/user.schema";

// Define the prediction interface
interface Prediction {
  _id: string;
  coinpair: string;
  symbol: string;
  high: number;
  low: number;
  close: number;
  timestamp: any; // Or use a more specific type like Date | number | string
  status: string;
  userId: string;
}

// Define the prediction data interface
interface PredictionData {
  high: number;
  low: number;
  close: number;
  timestamp?: any;
  confidence?: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { coinpair: string; userId: string } }
) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // Validate route parameters
    const paramsValidation = validateParams(params, userPredictionParamsSchema);
    if (!paramsValidation.success) {
      return paramsValidation.response;
    }

    const { coinpair, userId } = paramsValidation.data;

    // Verify the user ID matches the authenticated user
    const decodedUserId = decodeURIComponent(userId);
    if (decodedUserId !== session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized: User ID mismatch" },
        { status: 403 }
      );
    }

    // Get and validate search params
    const { searchParams } = new URL(request.url);
    const queryValidation = validateQuery(
      request,
      checkSubmissionQuerySchema
    );
    if (!queryValidation.success) {
      return queryValidation.response;
    }

    const { checkSubmission, round } = queryValidation.data;

    // Format the coinpair for querying
    const formattedCoinPair = coinpair.replace(/USD$/, "/USD");

    // If this is just a submission check
    if (checkSubmission) {
      // Find predictions with user data directly from predictions collection
      const predictionDocs = await prisma.predictions.findMany({
        where: {
          OR: [{ symbol: coinpair }, { symbol: formattedCoinPair }],
        },
      });

      // Check if current or next round predictions exist for this user
      let hasCurrentPredictions = false;
      let hasNextPredictions = false;

      for (const doc of predictionDocs) {
        // Access the JSON fields for current and next predictions
        const currentPreds = doc.CurrentPredictions as Record<string, any>;
        const nextPreds = doc.NextRoundPredictions as Record<string, any>;

        // Check if user predictions exist
        if (currentPreds && Object.keys(currentPreds).includes(decodedUserId)) {
          hasCurrentPredictions = true;
        }

        if (nextPreds && Object.keys(nextPreds).includes(decodedUserId)) {
          hasNextPredictions = true;
        }
      }

      return NextResponse.json({
        hasSubmitted: hasCurrentPredictions || hasNextPredictions,
        currentRoundSubmitted: hasCurrentPredictions,
        nextRoundSubmitted: hasNextPredictions,
      });
    }

    // Find predictions that match the coin pair using Prisma
    const predictionDocs = await prisma.predictions.findMany({
      where: {
        OR: [{ symbol: coinpair }, { symbol: formattedCoinPair }],
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    // Initialize prediction arrays
    const currentPredictions: Prediction[] = [];
    const nextPredictions: Prediction[] = [];

    // Process predictions to extract user data
    for (const doc of predictionDocs) {
      const symbol = doc.symbol || "Unknown";
      const displaySymbol = symbol.includes("/")
        ? symbol
        : `${symbol.replace("USD", "")}/USD`;

      // Access the JSON fields for current and next predictions
      const currentPreds = doc.CurrentPredictions as Record<string, any>;
      const nextPreds = doc.NextRoundPredictions as Record<string, any>;

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
            currentPredictions.push({
              _id: `${doc.id}_current_${index}`,
              coinpair: symbol,
              symbol: displaySymbol,
              high: pred.high,
              low: pred.low,
              close: pred.close,
              timestamp: pred.timestamp || doc.lastUpdated,
              status: "pending",
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
            nextPredictions.push({
              _id: `${doc.id}_next_${index}`,
              coinpair: symbol,
              symbol: displaySymbol,
              high: pred.high,
              low: pred.low,
              close: pred.close,
              timestamp: pred.timestamp || doc.lastUpdated,
              status: "pending",
              userId: decodedUserId,
            });
          }
        });
      }
    }

    // Sort the predictions by timestamp
    const sortByTimestamp = (a: Prediction, b: Prediction) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    };

    currentPredictions.sort(sortByTimestamp);
    nextPredictions.sort(sortByTimestamp);

    // Return the response based on the requested data format
    return NextResponse.json({
      success: true,
      current_predictions: currentPredictions,
      next_predictions: nextPredictions,
    });
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
