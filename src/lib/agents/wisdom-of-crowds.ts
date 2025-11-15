import { z } from "zod";

// User Strategy Schema
export const UserStrategySchema = z.object({
  sentiment: z.enum(["bullish", "bearish", "neutral"]),
  strategy: z.string(),
  condition: z.string(),
  successRate: z.number().min(0).max(1),
});

// User Traits Schema
export const UserTraitsSchema = z.object({
  USERSTREAK_025: z.number(), // Streak < 0.25%
  USERSTREAK_1: z.number(), // Streak < 1%
  USERSTREAK_2: z.number(), // Streak < 2%
  USERAccuracyConsistency: z.number().min(0).max(1),
  USERStrategiesWithHighestSuccess: z.array(UserStrategySchema),
  USERTier: z.enum(["novice", "intermediate", "expert", "elite"]),
});

// User Prediction Stats Schema
export const UserPredictionStatSchema = z.object({
  predictionId: z.string(),
  accuracy: z.number().min(0).max(1),
  deviation: z.number().min(0).max(1),
});

// User Schema
export const UserPredictionSchema = z.object({
  userId: z.string(),
  traits: UserTraitsSchema,
  stats: z.array(UserPredictionStatSchema),
  currentPrediction: z.object({
    sentiment: z.enum(["bullish", "bearish", "neutral"]),
    confidence: z.number().min(0).max(1),
    targetPrice: z.number(),
    timestamp: z.date(),
  }),
});

export type UserPrediction = z.infer<typeof UserPredictionSchema>;

// Wisdom of Crowds Agent
export class WisdomOfCrowdsAgent {
  private users: UserPrediction[];

  constructor(users: UserPrediction[]) {
    this.users = users;
  }

  private calculateUserWeight(user: UserPrediction): number {
    const {
      traits: { USERAccuracyConsistency, USERTier },
      stats,
    } = user;

    // Calculate average accuracy from stats
    const avgAccuracy =
      stats.reduce((sum, stat) => sum + stat.accuracy, 0) / stats.length;

    // Tier multiplier
    const tierMultiplier = {
      novice: 0.7,
      intermediate: 0.85,
      expert: 1,
      elite: 1.15,
    }[USERTier];

    // Calculate final weight
    return (avgAccuracy * 0.4 + USERAccuracyConsistency * 0.3) * tierMultiplier;
  }

  public getConsensus(): {
    sentiment: "bullish" | "bearish" | "neutral";
    confidence: number;
    weightedTargetPrice: number;
    participantCount: number;
    consensusStrength: "Low" | "Medium" | "High";
  } {
    const weightedPredictions = this.users.map((user) => ({
      prediction: user.currentPrediction,
      weight: this.calculateUserWeight(user),
    }));

    // Calculate weighted sentiment
    const sentimentScores = {
      bullish: 0,
      bearish: 0,
      neutral: 0,
    };

    let totalWeight = 0;
    let weightedPriceSum = 0;

    weightedPredictions.forEach(({ prediction, weight }) => {
      sentimentScores[prediction.sentiment] += weight;
      totalWeight += weight;
      weightedPriceSum += prediction.targetPrice * weight;
    });

    // Determine dominant sentiment
    const dominantSentiment = Object.entries(sentimentScores).reduce(
      (max, [sentiment, score]) =>
        score > max.score ? { sentiment, score } : max,
      { sentiment: "neutral", score: 0 }
    ).sentiment as "bullish" | "bearish" | "neutral";

    // Calculate confidence
    const confidence = sentimentScores[dominantSentiment] / totalWeight;

    // Determine consensus strength
    let consensusStrength: "Low" | "Medium" | "High";
    if (confidence > 0.8) consensusStrength = "High";
    else if (confidence > 0.6) consensusStrength = "Medium";
    else consensusStrength = "Low";

    return {
      sentiment: dominantSentiment,
      confidence,
      weightedTargetPrice: weightedPriceSum / totalWeight,
      participantCount: this.users.length,
      consensusStrength,
    };
  }
}
