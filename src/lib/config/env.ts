/**
 * Environment Variable Validation
 * Validates required environment variables at startup
 */

import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url().optional(),

  // External APIs
  NEXT_PUBLIC_AGENCY_API: z.string().url().optional(),

  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type EnvConfig = z.infer<typeof envSchema>;

let validatedEnv: EnvConfig | null = null;

/**
 * Validate environment variables
 * Should be called once at application startup
 */
export function validateEnv(): EnvConfig {
  if (validatedEnv) {
    return validatedEnv;
  }

  try {
    validatedEnv = envSchema.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `  - ${err.path.join(".")}: ${err.message}`)
        .join("\n");
      
      console.error("❌ Invalid environment variables:\n" + missingVars);
      throw new Error("Environment validation failed. Check your .env file.");
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 * Use this instead of process.env directly
 */
export function getEnv(): EnvConfig {
  if (!validatedEnv) {
    return validateEnv();
  }
  return validatedEnv;
}

// Validate on module load in production
if (process.env.NODE_ENV === "production") {
  validateEnv();
}

