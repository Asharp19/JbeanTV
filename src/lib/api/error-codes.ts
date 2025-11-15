/**
 * Standard API Error Codes
 */

export const ERROR_CODES = {
  // Authentication & Authorization
  AUTH_MISSING_CREDENTIALS: "AUTH_MISSING_CREDENTIALS",
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",
  AUTH_USER_EXISTS: "AUTH_USER_EXISTS",
  AUTH_UNAUTHORIZED: "AUTH_UNAUTHORIZED",
  AUTH_SESSION_EXPIRED: "AUTH_SESSION_EXPIRED",

  // Validation
  VALIDATION_FAILED: "VALIDATION_FAILED",
  VALIDATION_MISSING_FIELD: "VALIDATION_MISSING_FIELD",
  VALIDATION_INVALID_FORMAT: "VALIDATION_INVALID_FORMAT",
  VALIDATION_INVALID_RANGE: "VALIDATION_INVALID_RANGE",

  // Database
  DB_CONNECTION_FAILED: "DB_CONNECTION_FAILED",
  DB_QUERY_FAILED: "DB_QUERY_FAILED",
  DB_NOT_FOUND: "DB_NOT_FOUND",
  DB_DUPLICATE_ENTRY: "DB_DUPLICATE_ENTRY",

  // External API
  EXTERNAL_API_FAILED: "EXTERNAL_API_FAILED",
  EXTERNAL_API_TIMEOUT: "EXTERNAL_API_TIMEOUT",
  EXTERNAL_API_INVALID_RESPONSE: "EXTERNAL_API_INVALID_RESPONSE",

  // Rate Limiting
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

  // General
  INTERNAL_ERROR: "INTERNAL_ERROR",
  NOT_FOUND: "NOT_FOUND",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  BAD_REQUEST: "BAD_REQUEST",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Sanitize error message for production
 */
export function sanitizeError(error: any, isDevelopment: boolean): string {
  if (isDevelopment) {
    return error?.message || "An error occurred";
  }
  
  // In production, provide generic messages based on error type
  const message = error?.message?.toLowerCase() || "";
  
  // Database errors
  if (message.includes("prisma") || message.includes("database") || message.includes("query")) {
    return "A database error occurred. Please try again later.";
  }
  
  // Network/API errors
  if (message.includes("fetch") || message.includes("network") || message.includes("timeout")) {
    return "A network error occurred. Please check your connection and try again.";
  }
  
  // Auth errors
  if (message.includes("auth") || message.includes("token") || message.includes("session")) {
    return "Authentication failed. Please log in again.";
  }
  
  // Validation errors
  if (message.includes("validation") || message.includes("invalid")) {
    return "Invalid input provided. Please check your data and try again.";
  }
  
  // Generic fallback
  return "An error occurred. Please try again later.";
}

/**
 * Check if error contains sensitive information
 */
export function containsSensitiveInfo(message: string): boolean {
  const sensitivePatterns = [
    /password/i,
    /token/i,
    /secret/i,
    /api[_-]?key/i,
    /credential/i,
    /mongodb:\/\//i,
    /postgres:\/\//i,
    /mysql:\/\//i,
    /process\.env/i,
  ];
  
  return sensitivePatterns.some((pattern) => pattern.test(message));
}

/**
 * Remove sensitive information from error messages
 */
export function removeSensitiveInfo(message: string): string {
  let sanitized = message;
  
  // Remove connection strings
  sanitized = sanitized.replace(/mongodb:\/\/[^\s]+/gi, "mongodb://[REDACTED]");
  sanitized = sanitized.replace(/postgres:\/\/[^\s]+/gi, "postgres://[REDACTED]");
  sanitized = sanitized.replace(/mysql:\/\/[^\s]+/gi, "mysql://[REDACTED]");
  
  // Remove file paths
  sanitized = sanitized.replace(/([A-Z]:\\|\/)[^\s]+/g, "[PATH_REDACTED]");
  
  // Remove API keys/tokens
  sanitized = sanitized.replace(/[a-f0-9]{32,}/gi, "[KEY_REDACTED]");
  
  return sanitized;
}

