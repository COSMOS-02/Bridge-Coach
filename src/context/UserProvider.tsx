"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  type RegisterInput,
} from "@/lib/auth";
import type { UserProfile } from "@/lib/types";

type UserContextValue = {
  user: UserProfile | null;
  ready: boolean;
  register: (input: RegisterInput) => Promise<Awaited<ReturnType<typeof registerUser>>>;
  login: (email: string, password: string) => Promise<Awaited<ReturnType<typeof loginUser>>>;
  logout: () => Promise<void>;
  updateProfile: (
    updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
  ) => Promise<UserProfile | null>;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let ignore = false;
    void (async () => {
      const currentUser = await getSessionUser();
      if (!ignore) {
        setUser(currentUser);
        setReady(true);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const result = await registerUser(input);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>) => {
      const next = await updateUserProfile(updates);
      if (next) setUser(next);
      return next;
    },
    [],
  );

  const value = useMemo(
    () => ({ user, ready, register, login, logout, updateProfile }),
    [user, ready, register, login, logout, updateProfile],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}
