import { loginRequest, refreshRequest } from "@/api/authApi";
import { AuthResponse, AuthUser } from "@/types/auth";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(true);

  function setSession(response: AuthResponse) {
    setAccessToken(response.accessToken);

    setUser({
      userEmail: response.userEmail,
      userName: response.userName,
      userRole: response.userRole,
    });
  }

  async function login(email: string, password: string) {
    const response = await loginRequest(email, password);
    setSession(response);
  }

  async function restoreSession() {
    try {
      const response = await refreshRequest();
      setSession(response);
    } catch {
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsRestoringSession(false);
    }
  }

  useEffect(() => {
    restoreSession();
  }, []);

  const isAuthenticated = Boolean(accessToken && user);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        isRestoringSession,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
