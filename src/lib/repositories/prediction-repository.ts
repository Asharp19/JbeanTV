/**
 * Prediction Repository - Data access layer for predictions
 */

import prisma from "@/lib/db/prisma";

export class PredictionRepository {
  /**
   * Find all predictions for leaderboard
   */
  async findAll() {
    return prisma.prediction_leaderboard.findMany({
      orderBy: {
        predictedAt: "desc",
      },
    });
  }

  /**
   * Find predictions by coin pair
   */
  async findByCoinPair(coinpair: string) {
    const formattedPair = coinpair.replace(/USD$/, "/USD");
    
    return prisma.predictions.findMany({
      where: {
        OR: [{ symbol: coinpair }, { symbol: formattedPair }],
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });
  }

  /**
   * Get user prediction count for a coin pair
   */
  async getUserPredictionCount(coinpair: string) {
    const formattedPair = coinpair.replace(/USD$/, "/USD");
    
    const predictionDocs = await prisma.predictions.findMany({
      where: {
        OR: [{ symbol: coinpair }, { symbol: formattedPair }],
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    let totalCount = 0;
    const predictions: any[] = [];

    for (const doc of predictionDocs) {
      const nextPreds = doc.NextRoundPredictions as Record<string, any>;
      
      if (nextPreds) {
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
              totalCount++;
              predictions.push({
                userId,
                ...pred,
                coinpair: doc.symbol,
              });
            }
          });
        });
      }
    }

    return { totalCount, predictions };
  }

  /**
   * Check if user has submitted prediction
   */
  async hasUserSubmitted(coinpair: string, userId: string): Promise<boolean> {
    const formattedPair = coinpair.replace(/USD$/, "/USD");
    
    const predictionDocs = await prisma.predictions.findMany({
      where: {
        OR: [{ symbol: coinpair }, { symbol: formattedPair }],
      },
    });

    for (const doc of predictionDocs) {
      const nextPreds = doc.NextRoundPredictions as Record<string, any>;
      if (nextPreds && nextPreds[userId]) {
        return true;
      }
    }

    return false;
  }

  /**
   * Get historical predictions
   */
  async getHistoricalPredictions(coinpair: string) {
    const formattedPair = coinpair.replace(/USD$/, "/USD");

    const historyRecords = await prisma.agent_predictions_history.findMany({
      where: {
        OR: [{ id: { equals: coinpair } }, { id: { equals: formattedPair } }],
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 50,
    });

    return historyRecords;
  }
}

export const predictionRepository = new PredictionRepository();

