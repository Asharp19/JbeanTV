/**
 * React Query hooks for predictions
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  fetchHistoricalPredictions,
  fetchPersonalPredictions,
} from "@/lib/services/prediction-service";

export function useHistoricalPredictionsQuery(coinpair: string) {
  return useQuery({
    queryKey: queryKeys.predictions.historical(coinpair),
    queryFn: () => fetchHistoricalPredictions(coinpair),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function usePersonalPredictionsQuery(coinpair: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.predictions.personal(coinpair),
    queryFn: () => fetchPersonalPredictions(coinpair),
    enabled,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useUserPredictionsQuery(coinpair: string) {
  return useQuery({
    queryKey: queryKeys.predictions.user(coinpair),
    queryFn: async () => {
      const response = await fetch(`/api/user-predictions/${coinpair}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user predictions");
      }
      return response.json();
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

