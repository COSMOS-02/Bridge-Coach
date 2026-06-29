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
  register: (input: RegisterInput) => ReturnType<typeof registerUser>;
  login: (email: string, password: string) => ReturnType<typeof loginUser>;
  logout: () => void;
  updateProfile: (
    updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>,
  ) => UserProfile | null;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getSessionUser());
    setReady(true);
  }, []);

  const register = useCallback((input: RegisterInput) => {
    const result = registerUser(input);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = loginUser(email, password);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<Pick<UserProfile, "lifeStage" | "country" | "currency">>) => {
      const next = updateUserProfile(updates);
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
