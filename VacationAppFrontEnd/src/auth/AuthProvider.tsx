import { AuthResponse, AuthUser } from "@/types/auth";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { loginRequest, refreshRequest } from "../api/authApi";
import { AuthContext } from "../auth/AuthContext";
interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false);
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
        isLoading,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
