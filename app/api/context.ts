import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./local-auth";

export type UnifiedUser = {
  id: number;
  name: string | null;
  email: string | null;
  role: "user" | "admin";
  avatar?: string | null;
  source: "oauth" | "local";
  unionId?: string;
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  unifiedUser?: UnifiedUser;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = oauthUser;
      ctx.unifiedUser = {
        id: oauthUser.id,
        name: oauthUser.name,
        email: oauthUser.email,
        role: oauthUser.role as "user" | "admin",
        avatar: oauthUser.avatar,
        source: "oauth",
        unionId: oauthUser.unionId,
      };
      return ctx;
    }
  } catch {
    // OAuth auth failed, try local
  }

  // Try local auth
  try {
    const localUser = await verifyLocalToken(opts.req.headers);
    if (localUser) {
      ctx.unifiedUser = localUser;
    }
  } catch {
    // Local auth also failed
  }

  return ctx;
}
