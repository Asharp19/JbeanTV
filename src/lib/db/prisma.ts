import { PrismaClient } from "../../../src/generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

// Create singleton instance of Prisma Client to avoid multiple instances in development
const prisma = global.prisma || new PrismaClient();

// Store prisma client in global variable in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
