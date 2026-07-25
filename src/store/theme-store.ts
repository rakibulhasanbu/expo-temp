import { colorScheme } from "nativewind";
import { Appearance } from "react-native";
import { create } from "zustand";

import { getThemePreference, setThemePreference, type ThemePreference } from "@/lib/theme-storage";

type ThemeState = {
  theme: ThemePreference;
  isUserSet: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setTheme: (theme: ThemePreference) => Promise<void>;
};

let systemSubscription: ReturnType<typeof Appearance.addChangeListener> | null = null;

const stopFollowingSystem = () => {
  systemSubscription?.remove();
  systemSubscription = null;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: Appearance.getColorScheme() ?? "light",
  isUserSet: false,
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;

    try {
      const stored = await getThemePreference();

      if (stored) {
        colorScheme.set(stored);
        set({ theme: stored, isUserSet: true });
        return;
      }

      const resolved = Appearance.getColorScheme() ?? "light";
      colorScheme.set(resolved);
      set({ theme: resolved, isUserSet: false });

      stopFollowingSystem();
      systemSubscription = Appearance.addChangeListener(({ colorScheme: next }) => {
        if (get().isUserSet) return;
        const nextTheme = next ?? "light";
        colorScheme.set(nextTheme);
        set({ theme: nextTheme });
      });
    } finally {
      set({ hydrated: true });
    }
  },

  setTheme: async (theme) => {
    stopFollowingSystem();
    colorScheme.set(theme);
    set({ theme, isUserSet: true });
    await setThemePreference(theme);
  },
}));
