/**
 * Main content component for the login page
 */
import { FC } from "react";
import { LoginForm } from "./LoginForm";

/**
 * Props for LoginContent component
 */
export interface LoginContentProps {
  /** Additional class names */
  className?: string;
}

/**
 * Main content component for the login page that displays the login form
 */
export const LoginContent: FC<LoginContentProps> = ({ className = "" }) => {
  return (
    <div className={`max-w-md w-full space-y-8 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="mt-6 text-3xl font-extrabold text-content-primary">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-content-secondary">
          Welcome back! Please enter your details.
        </p>
      </div>

      <LoginForm />
    </div>
  );
};
