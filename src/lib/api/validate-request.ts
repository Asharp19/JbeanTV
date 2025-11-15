/**
 * Request Validation Middleware
 */

import { NextRequest } from "next/server";
import { ZodSchema, ZodError } from "zod";
import { errorResponse } from "./response-wrapper";
import { ERROR_CODES } from "./error-codes";

/**
 * Validate request body against a Zod schema
 */
export async function validateBody<T>(
  request: NextRequest,
  schema: ZodSchema<T, any, any>
): Promise<{ success: true; data: T } | { success: false; response: ReturnType<typeof errorResponse> }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        response: errorResponse(
          ERROR_CODES.VALIDATION_FAILED,
          errorMessage,
          400,
          error.errors
        ),
      };
    }
    return {
      success: false,
      response: errorResponse(
        ERROR_CODES.BAD_REQUEST,
        "Invalid request body",
        400
      ),
    };
  }
}

/**
 * Validate query parameters against a Zod schema
 */
export function validateQuery<T>(
  request: NextRequest,
  schema: ZodSchema<T, any, any>
): { success: true; data: T } | { success: false; response: ReturnType<typeof errorResponse> } {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryObj: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });
    const data = schema.parse(queryObj);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        response: errorResponse(
          ERROR_CODES.VALIDATION_FAILED,
          errorMessage,
          400,
          error.errors
        ),
      };
    }
    return {
      success: false,
      response: errorResponse(
        ERROR_CODES.BAD_REQUEST,
        "Invalid query parameters",
        400
      ),
    };
  }
}

/**
 * Validate route parameters against a Zod schema
 */
export function validateParams<T>(
  params: any,
  schema: ZodSchema<T, any, any>
): { success: true; data: T } | { success: false; response: ReturnType<typeof errorResponse> } {
  try {
    const data = schema.parse(params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        response: errorResponse(
          ERROR_CODES.VALIDATION_FAILED,
          errorMessage,
          400,
          error.errors
        ),
      };
    }
    return {
      success: false,
      response: errorResponse(
        ERROR_CODES.BAD_REQUEST,
        "Invalid route parameters",
        400
      ),
    };
  }
}

