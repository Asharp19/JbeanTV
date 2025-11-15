import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import { successResponse, errorResponse, errorFromException } from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";

// Define local interface matching the structure used
interface PredictionData {
  agentName: string;
  predictionDate: string;
  targetDate: string;
  prediction: {
    high: number;
    low: number;
    close: number;
  };
  actualPrice?: {
    high: number | undefined;
    low: number | undefined;
    close: number | undefined;
  };
  percentDifference?: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { coinpair: string } }
) {
  try {
    // Validate input first
    if (!params.coinpair) {
      return errorResponse(
        ERROR_CODES.VALIDATION_MISSING_FIELD,
        "Coinpair parameter is required",
        400
      );
    }

    const coinPair = params.coinpair.toUpperCase();
    let predictions: PredictionData[] = [];

    // Format the coinpair for query
    const formattedPair = coinPair.replace("USD", "/USD");

    // Check if Prisma client is initialized
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return errorResponse(
        ERROR_CODES.DB_CONNECTION_FAILED,
        "Database connection not available",
        500
      );
    }

    // Add this at the beginning of your route handler to see what's in the collection
    const allIds = await prisma.agent_predictions_history.findMany({
      select: { id: true },
    });
    console.log(
      "Available IDs in collection:",
      allIds.map((record) => record.id)
    );
    console.log("coinPair", coinPair);
    console.log("formattedPair", formattedPair);

    try {
      // Query for agent_predictions_history using the correct schema structure
      const historyRecords = await prisma.agent_predictions_history.findMany({
        where: {
          OR: [{ id: { equals: coinPair } }, { id: { equals: formattedPair } }],
        },
        orderBy: {
          timestamp: "desc",
        },
        take: 50,
      });
      console.log(historyRecords);
      // Process the past_seven_predictions data from the records
      if (historyRecords && historyRecords.length > 0) {
        for (const record of historyRecords) {
          if (
            record.past_seven_predictions &&
            record.past_seven_predictions.length > 0
          ) {
            // Extract agent data from each past prediction
            for (const prediction of record.past_seven_predictions) {
              try {
                // Check if we have valid prediction data
                if (
                  prediction.ceoAgent &&
                  prediction.technicalAgent &&
                  prediction.wisdomOfCrowds
                ) {
                  // Add CEO Agent prediction
                  if (
                    typeof prediction.ceoAgent.high === "number" &&
                    typeof prediction.ceoAgent.low === "number" &&
                    typeof prediction.ceoAgent.close === "number"
                  ) {
                    predictions.push({
                      agentName: "Coordinator Agent",
                      predictionDate:
                        prediction.timestamp || prediction.lastUpdated,
                      targetDate: prediction.targetDate,
                      prediction: {
                        high: prediction.ceoAgent.high,
                        low: prediction.ceoAgent.low,
                        close: prediction.ceoAgent.close,
                      },
                      actualPrice: {
                        high: prediction.resultPrice?.high ?? undefined,
                        low: prediction.resultPrice?.low ?? undefined,
                        close: prediction.resultPrice?.close ?? undefined,
                      },
                      percentDifference: prediction.resultPrice?.close
                        ? Math.abs(
                            ((prediction.ceoAgent.close -
                              prediction.resultPrice.close) /
                              prediction.resultPrice.close) *
                              100
                          )
                        : undefined,
                    });
                  }

                  // Add Technical Agent prediction
                  if (
                    typeof prediction.technicalAgent.high === "number" &&
                    typeof prediction.technicalAgent.low === "number" &&
                    typeof prediction.technicalAgent.close === "number"
                  ) {
                    predictions.push({
                      agentName: "AI Predictions",
                      predictionDate:
                        prediction.timestamp || prediction.lastUpdated,
                      targetDate: prediction.targetDate,
                      prediction: {
                        high: prediction.technicalAgent.high,
                        low: prediction.technicalAgent.low,
                        close: prediction.technicalAgent.close,
                      },
                      actualPrice: {
                        high: prediction.resultPrice?.high ?? undefined,
                        low: prediction.resultPrice?.low ?? undefined,
                        close: prediction.resultPrice?.close ?? undefined,
                      },
                      percentDifference: prediction.resultPrice?.close
                        ? Math.abs(
                            ((prediction.technicalAgent.close -
                              prediction.resultPrice.close) /
                              prediction.resultPrice.close) *
                              100
                          )
                        : undefined,
                    });
                  }

                  // Add Wisdom of Crowds prediction
                  if (
                    typeof prediction.wisdomOfCrowds.high === "number" &&
                    typeof prediction.wisdomOfCrowds.low === "number" &&
                    typeof prediction.wisdomOfCrowds.close === "number"
                  ) {
                    predictions.push({
                      agentName: "Wisdom of Crowds",
                      predictionDate:
                        prediction.timestamp || prediction.lastUpdated,
                      targetDate: prediction.targetDate,
                      prediction: {
                        high: prediction.wisdomOfCrowds.high,
                        low: prediction.wisdomOfCrowds.low,
                        close: prediction.wisdomOfCrowds.close,
                      },
                      actualPrice: {
                        high: prediction.resultPrice?.high ?? undefined,
                        low: prediction.resultPrice?.low ?? undefined,
                        close: prediction.resultPrice?.close ?? undefined,
                      },
                      percentDifference: prediction.resultPrice?.close
                        ? Math.abs(
                            ((prediction.wisdomOfCrowds.close -
                              prediction.resultPrice.close) /
                              prediction.resultPrice.close) *
                              100
                          )
                        : undefined,
                    });
                  }
                }
              } catch (predictionError) {
                console.error("Error processing prediction:", predictionError);
                // Continue with next prediction
              }
            }
          }
        }
      }

      // If no predictions found, try to query from the predictions collection
      if (predictions.length === 0) {
        try {
          const predictionRecords = await prisma.predictions.findMany({
            where: {
              symbol: { in: [coinPair, formattedPair] },
            },
            orderBy: {
              lastUpdated: "desc",
            },
            take: 10,
          });

          for (const record of predictionRecords) {
            try {
              const messagesData = record.messagesCurrentAnalysis;
              if (!messagesData) continue;

              // Extract agent types - using the structure from schema
              const agentTypes = [
                {
                  name: "Coordinator Agent",
                  messages: messagesData.CeoAgent || [],
                },
                {
                  name: "AI Predictions",
                  messages: messagesData.TechnicalAgent || [],
                },
                {
                  name: "Wisdom of Crowds",
                  messages: messagesData.CrowdAnalystAgent || [],
                },
              ];

              // Process each agent's messages
              for (const agent of agentTypes) {
                if (!agent.messages || agent.messages.length === 0) continue;

                // Extract prediction data from messages
                for (const message of agent.messages) {
                  // Check if the message contains prediction data (customize based on your data structure)
                  const predictionData =
                    typeof message === "string"
                      ? tryParseJSON(message)?.prediction
                      : (message as any)?.prediction;

                  if (
                    predictionData &&
                    typeof predictionData.high === "number" &&
                    typeof predictionData.low === "number" &&
                    typeof predictionData.close === "number"
                  ) {
                    predictions.push({
                      agentName: agent.name,
                      predictionDate: record.lastUpdated,
                      targetDate: record.targetDate,
                      prediction: {
                        high: predictionData.high,
                        low: predictionData.low,
                        close: predictionData.close,
                      },
                      actualPrice: undefined,
                      percentDifference: undefined,
                    });
                  }
                }
              }
            } catch (recordError) {
              console.error("Error processing prediction record:", recordError);
              // Continue with next record
            }
          }
        } catch (predictionsError) {
          console.error(
            "Error fetching from predictions collection:",
            predictionsError
          );
          // Continue with whatever predictions we have
        }
      }
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return errorFromException(dbError, ERROR_CODES.DB_QUERY_FAILED);
    }

    // Return a proper JSON response
    return successResponse({
      predictions: predictions || [],
    });
  } catch (error) {
    console.error("Error fetching historical predictions:", error);
    return errorFromException(error, ERROR_CODES.DB_QUERY_FAILED);
  }
}

// Helper function to safely parse JSON
function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}
