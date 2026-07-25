import type { ReactNode } from "react";
import { useEffect } from "react";

import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import * as SplashScreen from "expo-splash-screen";

type HydrationProviderProps = {
  children: ReactNode;
};

const storeHydrators: (() => Promise<void>)[] = [
  () => useAuthStore.getState().hydrate(),
  () => useThemeStore.getState().hydrate(),
];

SplashScreen.preventAutoHideAsync().catch(() => {});

export const HydrationProvider = ({ children }: HydrationProviderProps) => {
  const status = useAuthStore((state) => state.status);
  const themeHydrated = useThemeStore((state) => state.hydrated);

  useEffect(() => {
    storeHydrators.forEach((hydrate) => hydrate());
  }, []);

  useEffect(() => {
    if (status !== AuthStatus.Idle && themeHydrated) {
      SplashScreen.hideAsync();
    }
  }, [status, themeHydrated]);

  return children;
};
