"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TickerProvider } from "@/contexts/TickerContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TickerProvider>
        {children}
      </TickerProvider>
    </QueryClientProvider>
  );
}
