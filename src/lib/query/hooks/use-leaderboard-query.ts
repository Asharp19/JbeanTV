/**
 * React Query hook for leaderboard
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";

export function useLeaderboardQuery() {
  return useQuery({
    queryKey: queryKeys.leaderboard.list(),
    queryFn: async () => {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      const data = await response.json();
      return data;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

