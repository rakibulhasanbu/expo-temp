import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemePreference = "light" | "dark";

const THEME_PREFERENCE_KEY = "theme_preference";

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === "light" || value === "dark";

export const getThemePreference = async (): Promise<ThemePreference | null> => {
  const value = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
  return isThemePreference(value) ? value : null;
};

export const setThemePreference = (value: ThemePreference) =>
  AsyncStorage.setItem(THEME_PREFERENCE_KEY, value);
