import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  // For GitHub Pages deployment, we bypass the server call as it's a static host.
  if (import.meta.env.PROD && window.location.hostname.includes("github.io")) {
    return {
      user: undefined,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
