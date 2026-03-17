import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  token: string | null;
  organizationId: string | null;
  eventId: string | null;
  login: (token: string, organizationId: string, eventId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("scanner_token"));
  const [organizationId, setOrganizationId] = useState<string | null>(localStorage.getItem("scanner_org_id"));
  const [eventId, setEventId] = useState<string | null>(localStorage.getItem("scanner_event_id"));

  const login = useCallback((newToken: string, newOrgId: string, newEventId: string) => {
    localStorage.setItem("scanner_token", newToken);
    localStorage.setItem("scanner_org_id", newOrgId);
    localStorage.setItem("scanner_event_id", newEventId);
    setToken(newToken);
    setOrganizationId(newOrgId);
    setEventId(newEventId);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("scanner_token");
    localStorage.removeItem("scanner_org_id");
    localStorage.removeItem("scanner_event_id");
    setToken(null);
    setOrganizationId(null);
    setEventId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        organizationId,
        eventId,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
