/**
 * React Query hook for agent messages
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { fetchAgentMessages, LegacyAgentMessages } from "@/lib/services/agent-message-service";

export function useAgentMessagesQuery(coinpair: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.agentMessages.detail(coinpair),
    queryFn: () => fetchAgentMessages(coinpair),
    enabled,
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 4000, // Consider stale after 4 seconds
  });
}

