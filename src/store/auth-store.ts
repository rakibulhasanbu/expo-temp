import { create } from "zustand";

import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/secure-storage";

export type AuthStatus = "idle" | "authenticated" | "unauthenticated";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  status: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  hydrate: () => Promise<void>;
  setSession: (tokens: AuthTokens) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: "idle",
  accessToken: null,
  refreshToken: null,

  hydrate: async () => {
    const [accessToken, refreshToken] = await Promise.all([getAccessToken(), getRefreshToken()]);

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, status: "authenticated" });
    } else {
      set({ accessToken: null, refreshToken: null, status: "unauthenticated" });
    }
  },

  setSession: async ({ accessToken, refreshToken }) => {
    await Promise.all([setAccessToken(accessToken), setRefreshToken(refreshToken)]);
    set({ accessToken, refreshToken, status: "authenticated" });
  },

  signOut: async () => {
    await Promise.all([deleteAccessToken(), deleteRefreshToken()]);
    set({ accessToken: null, refreshToken: null, status: "unauthenticated" });
  },
}));
