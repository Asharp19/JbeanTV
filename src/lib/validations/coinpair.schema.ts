/**
 * Coinpair Validation Schemas
 */

import { z } from "zod";

// Valid trading pairs
export const VALID_PAIRS = [
  "BTCUSD",
  "ETHUSD",
  "SOLUSD",
  "AVAXUSD",
  "XRPUSD",
  "BNBUSD",
] as const;

export const coinpairSchema = z.object({
  coinpair: z
    .string()
    .min(1, "Coinpair is required")
    .regex(/^[A-Z]+USD$/, "Invalid coinpair format")
    .refine(
      (val) => VALID_PAIRS.includes(val as any),
      "Unsupported trading pair"
    ),
});

export const symbolQuerySchema = z.object({
  symbol: z
    .string()
    .min(1, "Symbol is required")
    .regex(/^[A-Z]+USDT?$/, "Invalid symbol format"),
  interval: z
    .enum(["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"])
    .optional()
    .default("1d"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  limit: z.string().optional(),
});

export type CoinpairInput = z.infer<typeof coinpairSchema>;
export type SymbolQueryInput = z.infer<typeof symbolQuerySchema>;

