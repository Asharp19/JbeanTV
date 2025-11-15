/**
 * Profile redirect component that routes users based on authentication status
 */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Component that redirects users based on their authentication status
 * - Unauthenticated users are redirected to login
 * - Authenticated users are redirected to their profile with the default coin pair (BTCUSD)
 */
export function ProfileRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading" || isRedirecting) return;

    setIsRedirecting(true);

    if (status === "unauthenticated") {
      // Redirect to login if not authenticated
      router.push("/login");
    } else if (status === "authenticated") {
      // Redirect to BTCUSD profile page if authenticated
      router.push("/profile/BTCUSD");
    }
  }, [status, router, isRedirecting]);

  // Always show loading while we're determining where to go
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
    </div>
  );
}
