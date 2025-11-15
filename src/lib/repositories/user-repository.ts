/**
 * User Repository - Data access layer for users
 */

import prisma from "@/lib/db/prisma";

export class UserRepository {
  /**
   * Find user by email
   */
  async findByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  /**
   * Find user by ID
   */
  async findById(id: string) {
    return prisma.users.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new user
   */
  async create(email: string, hashedPassword: string) {
    return prisma.users.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        v: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Update user
   */
  async update(id: string, data: { email?: string; password?: string }) {
    return prisma.users.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Delete user
   */
  async delete(id: string) {
    return prisma.users.delete({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository();

