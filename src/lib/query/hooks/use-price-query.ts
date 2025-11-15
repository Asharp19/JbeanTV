/**
 * React Query hooks for price data
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { fetchPriceData } from "@/lib/services/price-service";

export function usePriceQuery(symbol: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.prices.current(symbol),
    queryFn: () => fetchPriceData(symbol),
    enabled,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}

export function useCryptoPricesQuery() {
  return useQuery({
    queryKey: queryKeys.prices.crypto(),
    queryFn: async () => {
      const response = await fetch("/api/crypto-prices");
      if (!response.ok) {
        throw new Error("Failed to fetch crypto prices");
      }
      return response.json();
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

