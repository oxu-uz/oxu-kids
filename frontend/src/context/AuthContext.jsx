import { createContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { normalizeSession, normalizeUser } from "../lib/auth";
import { apiFetch } from "../lib/api";

const STORAGE_KEY = "oxu-kids-session";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeSession(JSON.parse(saved)) : null;
  });
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(session?.token));

  useEffect(() => {
    if (!session) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (!session?.token) {
      setIsBootstrapping(false);
      return;
    }

    let isMounted = true;

    apiFetch("/auth/me", { token: session.token })
      .then((user) => {
        if (isMounted) {
          setSession((current) => (current ? { ...current, user: normalizeUser(user) } : current));
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: credentials,
    });

    flushSync(() => {
      setSession(normalizeSession(data));
    });

    return normalizeSession(data);
  };

  const register = async (payload) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: payload,
    });

    flushSync(() => {
      setSession(normalizeSession(data));
    });

    return normalizeSession(data);
  };

  const logout = () => {
    flushSync(() => {
      setSession(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: session?.token ?? null,
        user: session?.user ?? null,
        isAuthenticated: Boolean(session?.token),
        isBootstrapping,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
