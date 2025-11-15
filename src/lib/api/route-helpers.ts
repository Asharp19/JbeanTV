/**
 * Common Route Handler Patterns
 * Combines validation, authentication, and other middleware
 */

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ZodSchema } from "zod";
import {
  validateParams,
  validateQuery,
  validateBody,
} from "./validate-request";
import { errorResponse } from "./response-wrapper";
import { ERROR_CODES } from "./error-codes";

/**
 * Authenticated route handler with parameter validation
 */
export async function withAuthAndValidation<
  TParams = any,
  TQuery = any,
  TBody = any
>(config: {
  request: NextRequest;
  params?: any;
  paramsSchema?: ZodSchema<TParams>;
  querySchema?: ZodSchema<TQuery>;
  bodySchema?: ZodSchema<TBody>;
  handler: (data: {
    session: any;
    params?: TParams;
    query?: TQuery;
    body?: TBody;
  }) => Promise<Response>;
}) {
  const { request, params, paramsSchema, querySchema, bodySchema, handler } =
    config;

  // 1. Authenticate
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return errorResponse(
      ERROR_CODES.AUTH_UNAUTHORIZED,
      "Authentication required",
      401
    );
  }

  // 2. Validate params if provided
  let validatedParams: TParams | undefined;
  if (params && paramsSchema) {
    const validation = validateParams(params, paramsSchema);
    if (!validation.success) {
      return validation.response;
    }
    validatedParams = validation.data;
  }

  // 3. Validate query if provided
  let validatedQuery: TQuery | undefined;
  if (querySchema) {
    const validation = validateQuery(request, querySchema);
    if (!validation.success) {
      return validation.response;
    }
    validatedQuery = validation.data;
  }

  // 4. Validate body if provided
  let validatedBody: TBody | undefined;
  if (bodySchema) {
    const validation = await validateBody(request, bodySchema);
    if (!validation.success) {
      return validation.response;
    }
    validatedBody = validation.data;
  }

  // 5. Call handler with validated data
  return handler({
    session,
    params: validatedParams,
    query: validatedQuery,
    body: validatedBody,
  });
}

/**
 * Public route handler with optional validation (no auth required)
 */
export async function withValidation<TParams = any, TQuery = any>(config: {
  request: NextRequest;
  params?: any;
  paramsSchema?: ZodSchema<TParams>;
  querySchema?: ZodSchema<TQuery>;
  handler: (data: { params?: TParams; query?: TQuery }) => Promise<Response>;
}) {
  const { request, params, paramsSchema, querySchema, handler } = config;

  // 1. Validate params if provided
  let validatedParams: TParams | undefined;
  if (params && paramsSchema) {
    const validation = validateParams(params, paramsSchema);
    if (!validation.success) {
      return validation.response;
    }
    validatedParams = validation.data;
  }

  // 2. Validate query if provided
  let validatedQuery: TQuery | undefined;
  if (querySchema) {
    const validation = validateQuery(request, querySchema);
    if (!validation.success) {
      return validation.response;
    }
    validatedQuery = validation.data;
  }

  // 3. Call handler with validated data
  return handler({
    params: validatedParams,
    query: validatedQuery,
  });
}

