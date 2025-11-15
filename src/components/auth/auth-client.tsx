'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AuthClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };
  
  if (status === 'loading') {
    return (
      <div className="bg-surface-glass p-4 rounded-lg border border-border-tertiary">
        <p className="text-content-secondary">Loading authentication status...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-surface-glass p-4 rounded-lg border border-border-tertiary">
      <h2 className="text-lg font-medium text-content-primary mb-2">Client Authentication</h2>
      {session ? (
        <div>
          <p className="text-content-secondary mb-3">
            Signed in as <span className="font-medium text-content-primary">{session.user.email}</span>
          </p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <p className="text-content-secondary mb-3">
            Not signed in
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-md hover:bg-indigo-500/30 transition-colors"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
} 