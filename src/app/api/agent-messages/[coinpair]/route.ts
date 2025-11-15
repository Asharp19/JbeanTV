import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import { successResponse, errorResponse, errorFromException } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";
import { validateParams } from "@/lib/api/validate-request";
import { coinpairSchema } from "@/lib/validations/coinpair.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { coinpair: string } }
) {
  try {
    // Validate input parameter
    const validation = validateParams(params, coinpairSchema);
    if (!validation.success) {
      return validation.response;
    }

    // Format the symbol correctly for querying
    const formattedSymbol = params.coinpair
      .replace("USD", "/USD")
      .toUpperCase();

    console.log(
      `Querying for symbol: ${formattedSymbol}, original: ${params.coinpair}`
    );

    // Check if Prisma is initialized
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return errorResponse(
        ERROR_CODES.DB_CONNECTION_FAILED,
        "Database connection not available",
        500
      );
    }

    // Use Prisma to query the prediction from the predictions collection
    // instead of the non-existent message collection
    let prediction;
    try {
      prediction = await prisma.predictions.findFirst({
        where: {
          symbol: formattedSymbol,
        },
        orderBy: {
          lastUpdated: "desc",
        },
      });
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return errorFromException(dbError, ERROR_CODES.DB_QUERY_FAILED);
    }

    if (!prediction) {
      console.log(`No prediction found for symbol: ${formattedSymbol}`);
      // Try with alternative symbol format
      try {
        const alternativeSymbol = params.coinpair.toUpperCase();
        prediction = await prisma.predictions.findFirst({
          where: {
            symbol: alternativeSymbol,
          },
          orderBy: {
            lastUpdated: "desc",
          },
        });
      } catch (error) {
        console.error("Error trying alternative symbol:", error);
      }

      // If still no prediction found
      if (!prediction) {
        // Return empty messages instead of 404 to avoid errors in the frontend
        return successResponse({
          messages: {
            CEO: [],
            TechnicalAnalyst: [],
            CrowdAnalyst: [],
            targetDate: null,
          },
          lastUpdated: new Date().toISOString(),
        });
      }
    }

    try {
      // Transform the messages into the expected format based on the schema structure
      const messagesData = prediction.messagesCurrentAnalysis;

      const messages = {
        CEO: messagesData.CeoAgent || [],
        TechnicalAnalyst: messagesData.TechnicalAgent || [],
        CrowdAnalyst: messagesData.CrowdAnalystAgent || [],
        targetDate: prediction.targetDate || null,
      };

      console.log("Target date found:", prediction.targetDate);

      return successResponse({
        messages,
        lastUpdated: prediction.lastUpdated,
      });
    } catch (transformError) {
      console.error("Error transforming message data:", transformError);
      return errorFromException(transformError, ERROR_CODES.INTERNAL_ERROR);
    }
  } catch (error) {
    console.error("Error fetching agent messages:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}
