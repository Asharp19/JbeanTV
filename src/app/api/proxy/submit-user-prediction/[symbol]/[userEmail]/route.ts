import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  errorFromException,
} from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";
import { validateParams, validateBody } from "@/lib/api/validate-request";
import {
  proxyPredictionParamsSchema,
  proxyPredictionBodySchema,
} from "@/lib/validations/user.schema";

export async function POST(
  request: NextRequest,
  { params }: { params: { symbol: string; userEmail: string } }
) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return errorResponse(
        ERROR_CODES.AUTH_UNAUTHORIZED,
        "Authentication required",
        401
      );
    }

    // Validate route parameters
    const paramsValidation = validateParams(params, proxyPredictionParamsSchema);
    if (!paramsValidation.success) {
      return paramsValidation.response;
    }

    const { symbol, userEmail } = paramsValidation.data;

    // Verify user can only submit predictions for themselves
    if (session.user.email !== userEmail) {
      return errorResponse(
        ERROR_CODES.AUTH_UNAUTHORIZED,
        "You can only submit predictions for yourself",
        403
      );
    }

    // Validate request body
    const bodyValidation = await validateBody(request, proxyPredictionBodySchema);
    if (!bodyValidation.success) {
      return bodyValidation.response;
    }

    const body = bodyValidation.data;

    // Get the backend API URL from environment variables
    const agencyApiUrl = process.env.NEXT_PUBLIC_AGENCY_API;
    if (!agencyApiUrl) {
      return errorResponse(
        ERROR_CODES.INTERNAL_ERROR,
        "Backend API URL not configured",
        500
      );
    }

    // Forward the request to the backend API
    const response = await fetch(
      `${agencyApiUrl}/submit-user-prediction/${symbol}/${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!response.ok) {
      return errorResponse(
        ERROR_CODES.EXTERNAL_API_FAILED,
        `Backend API error: ${response.statusText}`,
        response.status
      );
    }

    // Get the response data
    const data = await response.json();

    // Return the response
    return successResponse(data, response.status);
  } catch (error) {
    console.error("Proxy error:", error);
    return errorFromException(error, ERROR_CODES.EXTERNAL_API_FAILED);
  }
}
