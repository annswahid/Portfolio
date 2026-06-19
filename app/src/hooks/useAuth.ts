import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

export type UnifiedUser = {
  id: number;
  name: string | null;
  email: string | null;
  role: "user" | "admin";
  avatar?: string | null;
  source?: "oauth" | "local";
};

export function useAuth() {
  const utils = trpc.useUtils();

  // Query OAuth user
  const {
    data: oauthUser,
    isLoading: oauthLoading,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  // Get local user data from localStorage
  const localUser = useMemo(() => {
    const stored = localStorage.getItem("local_auth_user");
    if (stored) {
      try {
        return JSON.parse(stored) as UnifiedUser;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  const isLoading = oauthLoading;

  const user: UnifiedUser | null = useMemo(() => {
    if (oauthUser) {
      return {
        id: oauthUser.id,
        name: oauthUser.name,
        email: oauthUser.email,
        role: oauthUser.role as "user" | "admin",
        avatar: oauthUser.avatar,
        source: "oauth" as const,
      };
    }
    if (localUser) {
      return {
        ...localUser,
        source: "local" as const,
      };
    }
    return null;
  }, [oauthUser, localUser]);

  const isAuthenticated = !!user;

  const logout = useCallback(() => {
    localStorage.removeItem("local_auth_token");
    localStorage.removeItem("local_auth_user");
    logoutMutation.mutate();
    window.location.reload();
  }, [logoutMutation]);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading: isLoading || logoutMutation.isPending,
      logout,
      refresh: () => utils.invalidate(),
    }),
    [user, isAuthenticated, isLoading, logoutMutation.isPending, logout, utils]
  );
}
