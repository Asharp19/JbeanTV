/**
 * Middleware Composer
 * Allows chaining multiple middleware functions
 */

import { NextRequest } from "next/server";

type Middleware = (
  request: NextRequest,
  handler: (request: NextRequest, context?: any) => Promise<Response>,
  context?: any
) => Promise<Response>;

type Handler = (request: NextRequest, context?: any) => Promise<Response>;

/**
 * Compose multiple middleware functions
 */
export function composeMiddleware(...middlewares: Middleware[]) {
  return function (handler: Handler) {
    return async function (request: NextRequest, context?: any) {
      // Build the middleware chain from right to left
      let composedHandler = handler;

      for (let i = middlewares.length - 1; i >= 0; i--) {
        const middleware = middlewares[i];
        const nextHandler = composedHandler;
        composedHandler = async (req: NextRequest, ctx?: any) =>
          middleware(req, nextHandler, ctx);
      }

      return composedHandler(request, context);
    };
  };
}

/**
 * Helper to apply middleware to a route handler
 */
export function withMiddleware(
  handler: Handler,
  ...middlewares: Middleware[]
) {
  return composeMiddleware(...middlewares)(handler);
}

