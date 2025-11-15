/**
 * User and Prediction Validation Schemas
 */

import { z } from "zod";

export const userIdParamSchema = z.object({
  userId: z
    .string()
    .min(1, "User ID is required")
    .email("User ID must be a valid email"),
});

export const userPredictionParamsSchema = z.object({
  coinpair: z
    .string()
    .min(1, "Coinpair is required")
    .regex(/^[A-Z]+USD$/, "Invalid coinpair format"),
  userId: z
    .string()
    .min(1, "User ID is required")
    .email("User ID must be a valid email"),
});

export const checkSubmissionQuerySchema = z
  .object({
    checkSubmission: z.string().optional(),
    round: z.string().optional(),
  })
  .transform((data) => ({
    checkSubmission: data.checkSubmission === "true",
    round: data.round,
  }));

export const proxyPredictionParamsSchema = z.object({
  symbol: z
    .string()
    .min(1, "Symbol is required")
    .regex(/^[A-Z]+USD$/, "Invalid symbol format"),
  userEmail: z
    .string()
    .min(1, "User email is required")
    .email("Invalid email format"),
});

export const proxyPredictionBodySchema = z.object({
  high: z.number().positive("High price must be positive"),
  low: z.number().positive("Low price must be positive"),
  close: z.number().positive("Close price must be positive"),
  targetDate: z.string().optional(),
}).refine((data) => data.low <= data.high, {
  message: "Low price cannot be greater than high price",
}).refine((data) => data.close >= data.low && data.close <= data.high, {
  message: "Close price must be between low and high price",
});

export type UserIdParamInput = z.infer<typeof userIdParamSchema>;
export type UserPredictionParamsInput = z.infer<typeof userPredictionParamsSchema>;
export type CheckSubmissionQueryInput = z.infer<typeof checkSubmissionQuerySchema>;
export type ProxyPredictionParamsInput = z.infer<typeof proxyPredictionParamsSchema>;
export type ProxyPredictionBodyInput = z.infer<typeof proxyPredictionBodySchema>;

