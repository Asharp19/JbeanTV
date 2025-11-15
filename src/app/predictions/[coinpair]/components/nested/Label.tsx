import { memo } from "react";
import { cn } from "@/lib/utils";

interface LabelProps {
  label: string;
  value: string | number;
  variant?: "default" | "percentage" | "date";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
}

export const Label = memo(function Label({
  label,
  value,
  variant = "default",
  size = "md",
  align = "center",
}: LabelProps) {
  const sizeClasses = {
    sm: {
      label: "text-[10px] sm:text-xs",
      value: "text-xs sm:text-sm",
    },
    md: {
      label: "text-xs sm:text-sm",
      value: "text-base sm:text-lg",
    },
    lg: {
      label: "text-sm sm:text-base",
      value: "text-xl sm:text-2xl",
    },
  };

  const variantClasses = {
    default: {
      label: "text-content-tertiary font-normal",
      value: "text-content-primary font-semibold",
    },
    percentage: {
      label: "text-content-secondary font-normal",
      value: "text-content-primary font-medium",
    },
    date: {
      label: "text-content-tertiary font-normal",
      value: "text-content-primary font-medium",
    },
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        variant === "default" ? "justify-start" : "justify-center",
        alignClasses[align]
      )}
    >
      <p
        className={cn(
          sizeClasses[size].label,
          variantClasses[variant].label,
          "mb-1 truncate"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          sizeClasses[size].value,
          variantClasses[variant].value,
          "truncate leading-none"
        )}
      >
        {variant === "percentage" ? `${value}%` : value}
      </p>
    </div>
  );
});
