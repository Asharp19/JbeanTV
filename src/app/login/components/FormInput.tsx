/**
 * FormInput component for the login and registration forms
 */
"use client";

import { FC, InputHTMLAttributes } from "react";

/**
 * Props for FormInput component
 */
export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input */
  label: string;
  /** Whether the input is required */
  required?: boolean;
  /** Additional class names for the input */
  inputClassName?: string;
  /** Additional class names for the label */
  labelClassName?: string;
}

/**
 * Reusable form input component with label
 */
export const FormInput: FC<FormInputProps> = ({
  label,
  id,
  required = false,
  className,
  inputClassName = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-content-secondary mb-1 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        id={id}
        required={required}
        className={`appearance-none block w-full px-4 py-3 bg-surface-glass border border-border-tertiary rounded-xl text-content-primary placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputClassName}`}
        {...props}
      />
    </div>
  );
};
