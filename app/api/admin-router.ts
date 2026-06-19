import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, localUsers } from "@db/schema";

export const adminRouter = createRouter({
  users: adminQuery.query(async () => {
    const db = getDb();

    // Get OAuth users
    const oauthUsers = await db.select().from(users);

    // Get local users
    const localUsersList = await db.select().from(localUsers);

    // Combine and normalize
    const combined = [
      ...oauthUsers.map((u) => ({
        id: `oauth_${u.id}`,
        name: u.name,
        email: u.email,
        role: u.role,
        source: "oauth" as const,
        createdAt: u.createdAt,
      })),
      ...localUsersList.map((u) => ({
        id: `local_${u.id}`,
        name: u.displayName || u.username,
        email: u.email,
        role: u.role,
        source: "local" as const,
        createdAt: u.createdAt,
      })),
    ];

    return combined;
  }),
});
