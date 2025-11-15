/**
 * Profile page that displays user predictions for a specific coin pair
 */
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProfileContent } from "./components/ProfileContent";

/**
 * Props for ProfilePage component
 */
interface ProfilePageProps {
  params: {
    coinpair: string;
  };
}

/**
 * Main profile page component that handles authentication check
 * and renders profile content
 */
export default function ProfilePage({ params }: ProfilePageProps) {
  const { coinpair } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gradient-page">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-start"></div>
          </div>
        </div>
      </main>
    );
  }

  // Handle if no user data is available
  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-page">
      <ProfileContent session={session} coinpair={coinpair} />
    </main>
  );
}
