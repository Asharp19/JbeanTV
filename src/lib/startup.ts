/**
 * Application Startup Initialization
 * Runs validation checks before the application starts
 */

import { validateEnv } from "./config/env";

/**
 * Initialize the application
 * Call this once at startup
 */
export function initializeApp() {
  console.log("🚀 Initializing application...");

  try {
    // Validate environment variables
    validateEnv();
    console.log("✅ Environment variables validated");

    // Add other startup checks here as needed
    // - Database connection check
    // - External API health checks
    // - Feature flags initialization
    // etc.

    console.log("✅ Application initialized successfully");
  } catch (error) {
    console.error("❌ Application initialization failed:", error);
    // In production, you might want to exit the process
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}

