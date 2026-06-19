import jwt from "jsonwebtoken";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import type { UnifiedUser } from "./context";

const JWT_SECRET = process.env.JWT_SECRET || "portfolio-local-auth-secret";

export async function verifyLocalToken(
  headers: Headers
): Promise<UnifiedUser | undefined> {
  const authHeader = headers.get("x-local-auth-token");
  if (!authHeader) return undefined;

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET) as {
      userId: number;
      username: string;
      role: string;
    };

    const db = getDb();
    const users = await db
      .select()
      .from(localUsers)
      .where(eq(localUsers.id, decoded.userId))
      .limit(1);

    if (users.length === 0) return undefined;

    const user = users[0];
    return {
      id: user.id,
      name: user.displayName || user.username,
      email: user.email,
      role: user.role as "user" | "admin",
      source: "local",
    };
  } catch {
    return undefined;
  }
}
