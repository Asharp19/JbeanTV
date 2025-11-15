/**
 * RegisterForm component that handles user registration
 */
"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormInput } from "../../login/components/FormInput";
import { AlertMessage } from "../../login/components/AlertMessage";
import { RegisterButton } from "./RegisterButton";

/**
 * Props for RegisterForm component
 */
export interface RegisterFormProps {
  /** Additional class names */
  className?: string;
}

/**
 * Form component that handles registration functionality
 */
export const RegisterForm: FC<RegisterFormProps> = ({ className = "" }) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to register with:", { email });

      // Call the registration API (using App Router API route)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Registration response status:", response.status);

      const data = await response.json();
      console.log("Registration response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful, redirecting to login...");
      router.push("/login?registered=true");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`px-8 pb-8 space-y-6 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email address"
          placeholder="Enter your email"
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          label="Password"
          placeholder="Create a password (min. 8 characters)"
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          label="Confirm Password"
          placeholder="Confirm your password"
        />
      </div>

      {/* Error Message */}
      <AlertMessage type="error" message={error} visible={!!error} />

      {/* Submit Button */}
      <div>
        <RegisterButton loading={loading} />
      </div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-content-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};
