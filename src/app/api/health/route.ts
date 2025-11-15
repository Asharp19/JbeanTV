/**
 * Health Check Endpoint
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  checks: {
    database: {
      status: "up" | "down";
      responseTime?: number;
      error?: string;
    };
  };
}

export async function GET() {
  const startTime = Date.now();
  const healthStatus: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: {
        status: "down",
      },
    },
  };

  // Check database connection
  try {
    const dbStart = Date.now();
    await prisma.predictions.findFirst();
    const dbTime = Date.now() - dbStart;

    healthStatus.checks.database = {
      status: "up",
      responseTime: dbTime,
    };
  } catch (error) {
    healthStatus.status = "degraded";
    healthStatus.checks.database = {
      status: "down",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  // Determine overall status
  if (healthStatus.checks.database.status === "down") {
    healthStatus.status = "unhealthy";
  }

  const statusCode = healthStatus.status === "unhealthy" ? 503 : 200;

  return NextResponse.json(healthStatus, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Response-Time": `${Date.now() - startTime}ms`,
    },
  });
}
