import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import {
  successResponse,
  errorFromException,
} from "@/lib/api/response-wrapper";
import { ERROR_CODES } from "@/lib/api/error-codes";
import { validateBody } from "@/lib/api/validate-request";
import { registerSchema } from "@/lib/validations/auth.schema";

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateBody(request, registerSchema);
    if (!validation.success) {
      return validation.response;
    }

    const { email, password } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return errorFromException(
        "User with this email already exists",
        ERROR_CODES.AUTH_USER_EXISTS,
        409
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.users.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        v: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Return success response
    return successResponse(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return errorFromException(error, ERROR_CODES.INTERNAL_ERROR);
  }
}
