import { Switch, Text, View } from "react-native";

import { useThemeStore } from "@/store/theme-store";

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const isDark = theme === "dark";

  return (
    <View className="flex-row items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <Text className="text-base font-medium text-card-foreground">
        {isDark ? "Dark mode" : "Light mode"}
      </Text>
      <Switch value={isDark} onValueChange={(value) => setTheme(value ? "dark" : "light")} />
    </View>
  );
};
