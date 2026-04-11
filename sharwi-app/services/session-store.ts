import { create } from "zustand";

type SessionState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  signIn: () => void;
  signOut: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  signIn: () =>
    set({
      isAuthenticated: true,
      accessToken: "demo-token",
    }),
  signOut: () =>
    set({
      isAuthenticated: false,
      accessToken: null,
    }),
}));
