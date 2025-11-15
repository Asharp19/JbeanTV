import { getSession as getNextAuthSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// Get session on the client side
export async function getClientSession() {
  return await getNextAuthSession();
}

// Get session on the server side (App Router pattern)
export async function getSession() {
  return await getServerSession(authOptions);
}

// Helper function to get the current user on the server
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Check if user is authenticated on the server side
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

// Export auth options for reuse
export { authOptions }; 