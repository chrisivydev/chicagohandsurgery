import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  // For GitHub Pages deployment, we bypass the server call as it's a static host.
  console.log("Checking hostname:", window.location.hostname);
  if (import.meta.env.PROD && window.location.hostname.includes("github.io")) {
    console.log("GitHub Pages detected, bypassing auth call.");
    return {
      user: undefined,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  console.log("Not on GitHub Pages, proceeding with auth call.");
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
