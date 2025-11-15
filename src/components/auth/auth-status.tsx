import { getSession } from '@/lib/auth';

export async function AuthStatus() {
  const session = await getSession();
  
  return (
    <div className="bg-surface-glass p-4 rounded-lg border border-border-tertiary">
      <h2 className="text-lg font-medium text-content-primary mb-2">Authentication Status</h2>
      {session ? (
        <div>
          <p className="text-content-secondary">
            Signed in as <span className="font-medium text-content-primary">{session.user.email}</span>
          </p>
          <p className="text-content-tertiary text-sm mt-1">
            User ID: {session.user.id}
          </p>
        </div>
      ) : (
        <p className="text-content-secondary">
          Not signed in
        </p>
      )}
    </div>
  );
} 