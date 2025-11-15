/**
 * Standard API Response Wrapper
 */

import { NextResponse } from "next/server";
import { ErrorCode, sanitizeError } from "./error-codes";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Create a successful API response
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Create an error API response
 */
export function errorResponse(
  code: ErrorCode,
  message: string,
  status: number = 500,
  details?: any
): NextResponse<ApiErrorResponse> {
  const isDevelopment = process.env.NODE_ENV === "development";

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(isDevelopment && details ? { details } : {}),
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Create an error response from an exception
 */
export function errorFromException(
  error: any,
  defaultCode: ErrorCode = "INTERNAL_ERROR",
  defaultStatus: number = 500
): NextResponse<ApiErrorResponse> {
  const isDevelopment = process.env.NODE_ENV === "development";
  const message = sanitizeError(error, isDevelopment);

  return errorResponse(
    defaultCode,
    message,
    defaultStatus,
    isDevelopment ? { stack: error?.stack } : undefined
  );
}

