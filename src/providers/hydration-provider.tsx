import type { ReactNode } from "react";
import { useEffect } from "react";

import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import * as SplashScreen from "expo-splash-screen";

type HydrationProviderProps = {
  children: ReactNode;
};

SplashScreen.preventAutoHideAsync().catch(() => {});

export const HydrationProvider = ({ children }: HydrationProviderProps) => {
  const status = useAuthStore((state) => state.status);
  const themeHydrated = useThemeStore((state) => state.hydrated);

  useEffect(() => {
    useAuthStore.getState().hydrate();
    useThemeStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (status !== AuthStatus.Idle && themeHydrated) {
      SplashScreen.hideAsync();
    }
  }, [status, themeHydrated]);

  return children;
};
