/**
 * Prediction Validation Schemas
 */

import { z } from "zod";

export const predictionSubmissionSchema = z.object({
  symbol: z
    .string()
    .min(1, "Symbol is required")
    .regex(/^[A-Z]+USD$/, "Invalid symbol format"),
  high: z.number().positive("High price must be positive"),
  low: z.number().positive("Low price must be positive"),
  close: z.number().positive("Close price must be positive"),
  targetDate: z.string().datetime("Invalid target date format"),
  userId: z.string().min(1, "User ID is required"),
}).refine((data) => data.low <= data.high, {
  message: "Low price cannot be greater than high price",
}).refine((data) => data.close >= data.low && data.close <= data.high, {
  message: "Close price must be between low and high price",
});

export const userPredictionQuerySchema = z.object({
  coinpair: z
    .string()
    .min(1, "Coinpair is required")
    .regex(/^[A-Z]+USD$/, "Invalid coinpair format"),
  userId: z.string().min(1, "User ID is required").optional(),
  checkSubmission: z
    .string()
    .transform((val) => val === "true")
    .optional(),
});

export type PredictionSubmissionInput = z.infer<typeof predictionSubmissionSchema>;
export type UserPredictionQueryInput = z.infer<typeof userPredictionQuerySchema>;

