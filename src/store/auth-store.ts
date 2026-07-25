import { create } from "zustand";

import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/secure-storage";

export const AuthStatus = {
  Idle: "idle",
  Authenticated: "authenticated",
  Unauthenticated: "unauthenticated",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional value+type companion pattern
export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

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
  status: AuthStatus.Idle,
  accessToken: null,
  refreshToken: null,

  hydrate: async () => {
    const [accessToken, refreshToken] = await Promise.all([getAccessToken(), getRefreshToken()]);

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, status: AuthStatus.Authenticated });
    } else {
      set({ accessToken: null, refreshToken: null, status: AuthStatus.Unauthenticated });
    }
  },

  setSession: async ({ accessToken, refreshToken }) => {
    await Promise.all([setAccessToken(accessToken), setRefreshToken(refreshToken)]);
    set({ accessToken, refreshToken, status: AuthStatus.Authenticated });
  },

  signOut: async () => {
    await Promise.all([deleteAccessToken(), deleteRefreshToken()]);
    set({ accessToken: null, refreshToken: null, status: AuthStatus.Unauthenticated });
  },
}));
