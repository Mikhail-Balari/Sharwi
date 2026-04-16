import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type SessionState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set) => ({
  isAuthenticated: false,
  accessToken: null,

  signIn: async (token: string) => {
    await SecureStore.setItemAsync("token", token);

    set({
      isAuthenticated: true,
      accessToken: token,
    });
  },

  signOut: async () => {
    await SecureStore.deleteItemAsync("token");

    set({
      isAuthenticated: false,
      accessToken: null,
    });
  },

  loadSession: async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      set({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  },
}));