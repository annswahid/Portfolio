import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "portfolio-local-auth-secret";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(255),
        password: z.string().min(6).max(255),
        displayName: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if username already exists
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(input.password, 10);

      // Insert user
      await db.insert(localUsers).values({
        username: input.username,
        passwordHash,
        displayName: input.displayName || input.username,
        email: input.email || null,
      });

      return { success: true };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const users = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (users.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const user = users[0];
      const valid = await bcrypt.compare(input.password, user.passwordHash);

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.displayName || user.username,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    }),
});
