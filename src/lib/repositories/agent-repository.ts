/**
 * Agent Repository - Data access layer for agent messages
 */

import prisma from "@/lib/db/prisma";

export class AgentRepository {
  /**
   * Get latest agent messages for a coin pair
   */
  async getMessagesByCoinPair(coinpair: string) {
    const formattedSymbol = coinpair.replace("USD", "/USD").toUpperCase();
    
    const prediction = await prisma.predictions.findFirst({
      where: {
        symbol: formattedSymbol,
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    // Try alternative format if not found
    if (!prediction) {
      return prisma.predictions.findFirst({
        where: {
          symbol: coinpair.toUpperCase(),
        },
        orderBy: {
          lastUpdated: "desc",
        },
      });
    }

    return prediction;
  }

  /**
   * Get agent prediction history
   */
  async getHistory(coinpair: string) {
    const formattedPair = coinpair.replace(/USD$/, "/USD").toUpperCase();

    return prisma.agent_predictions_history.findMany({
      where: {
        OR: [
          { id: { equals: coinpair.toUpperCase() } },
          { id: { equals: formattedPair } },
        ],
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 50,
    });
  }
}

export const agentRepository = new AgentRepository();

