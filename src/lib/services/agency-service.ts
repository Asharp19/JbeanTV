import { UserPrediction } from "@/lib/agents/wisdom-of-crowds";
import { AgentMessages, ConsensusResponse } from "@/lib/types/agency";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_AGENCY_API || "http://localhost:8000/api";

// Store successful endpoints to avoid retrying failed patterns
let successfulMessageEndpoint: string | null = null;

export async function startAnalysis(coinpair: string) {
  console.log(coinpair);
  const response = await fetch(`${API_BASE_URL}/start-analysis/${coinpair}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coinpair }),
  });

  console.log("analysis started");

  if (!response.ok) {
    throw new Error("Failed to start analysis");
  }

  return await response.json();
}
