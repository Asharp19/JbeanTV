/**
 * AlertMessage component for displaying success or error messages
 */
"use client";

import { FC, ReactNode } from "react";

/**
 * Props for AlertMessage component
 */
export interface AlertMessageProps {
  /** Type of alert */
  type: "success" | "error";
  /** Message content */
  message: string;
  /** Whether the alert is visible */
  visible: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Alert message component that displays success or error notifications
 */
export const AlertMessage: FC<AlertMessageProps> = ({
  type,
  message,
  visible,
  className = "",
}) => {
  if (!visible || !message) return null;

  const isSuccess = type === "success";

  const containerClasses = isSuccess
    ? "mx-8 mb-4 rounded-md bg-green-500/20 p-4 border border-green-500/30"
    : "rounded-md bg-red-500/20 p-3 border border-red-500/30";

  const iconColor = isSuccess ? "text-green-400" : "text-red-400";

  // SVG path for success or error icon
  const path = isSuccess
    ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 ${iconColor}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d={path} clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${iconColor}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};
