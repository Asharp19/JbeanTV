/**
 * Main content component for the registration page
 */
"use client";

import { FC } from "react";
import Image from "next/image";
import { RegisterForm } from "./RegisterForm";

/**
 * Props for RegisterContent component
 */
export interface RegisterContentProps {
  /** Additional class names */
  className?: string;
}

/**
 * Main content component for the registration page that displays the form
 */
export const RegisterContent: FC<RegisterContentProps> = ({
  className = "",
}) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="bg-surface-primary/20 backdrop-blur-xl rounded-2xl shadow-card overflow-hidden border border-border-primary">
        {/* Registration Form Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <Image
            src="/JBEANHeading.svg"
            alt="JBEAN Logo"
            width={150}
            height={60}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-content-primary mb-2">
            Create a new account
          </h2>
          <p className="text-content-secondary text-sm">
            Join the community of predictors and earn rewards
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};
