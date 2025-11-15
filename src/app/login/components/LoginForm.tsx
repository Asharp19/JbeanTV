/**
 * LoginForm component that handles user authentication
 */
"use client";

import { FC, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "./FormInput";
import { LoginButton } from "./LoginButton";
import { AlertMessage } from "./AlertMessage";

/**
 * Props for LoginForm component
 */
export interface LoginFormProps {
  /** Additional class names */
  className?: string;
}

/**
 * Form component that handles login functionality
 */
export const LoginForm: FC<LoginFormProps> = ({ className = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Check if user just registered
  useEffect(() => {
    const registered = searchParams?.get("registered");
    if (registered === "true") {
      setSuccess(
        "Registration successful! You can now log in with your credentials."
      );
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    console.log("Attempting login with:", { email });

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error: any) {
      setError(
        "Connection error. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`px-8 pb-8 space-y-6 ${className}`}
      onSubmit={handleSubmit}
    >
      {/* Success Message */}
      <AlertMessage type="success" message={success} visible={!!success} />

      <div className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          required
          label="Email address"
          placeholder="Enter your email"
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          label="Password"
          placeholder="Enter your password"
        />
      </div>

      {/* Error Message */}
      <AlertMessage type="error" message={error} visible={!!error} />

      {/* Submit Button */}
      <div>
        <LoginButton loading={loading} />
      </div>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm text-content-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};
