/**
 * RegisterPage component that serves as the route page for /register
 */
import { Suspense } from "react";
import { RegisterContent } from "./components/RegisterContent";

/**
 * Register page component with Suspense boundary
 */
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(to_right,#193460,#0f333b)] items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin"></div>
        }
      >
        <RegisterContent />
      </Suspense>
    </div>
  );
}
