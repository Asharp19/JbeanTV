/**
 * LoginPage component that serves as the route page for /login
 */
import { Suspense } from "react";
import { LoginContent } from "./components/LoginContent";

/**
 * Login page component with Suspense boundary
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background-dimmed to-background p-4">
      <Suspense
        fallback={
          <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin"></div>
        }
      >
        <LoginContent />
      </Suspense>
    </div>
  );
}
