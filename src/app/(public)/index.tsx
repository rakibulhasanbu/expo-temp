import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, Switch, Text, View } from "react-native";

import { ProtectedLink } from "@/components/protected-link";

export default function Index() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <View className="flex-row items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <Text className="text-base font-medium text-card-foreground">
          {isDark ? "Dark mode" : "Light mode"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={(value) => setColorScheme(value ? "dark" : "light")}
        />
      </View>

      <Text className="text-2xl font-medium text-primary">Letss goo working finee</Text>

      <ProtectedLink href="/brands" asChild>
        <Pressable className="rounded-lg bg-primary px-6 py-3">
          <Text className="text-base font-medium text-primary-foreground">Go to Brands</Text>
        </Pressable>
      </ProtectedLink>

      <ProtectedLink href="/profile" asChild>
        <Pressable className="rounded-lg bg-primary px-6 py-3">
          <Text className="text-base font-medium text-primary-foreground">Go to Profile</Text>
        </Pressable>
      </ProtectedLink>

      <Link href="/(auth)/sign-in" asChild>
        <Pressable className="rounded-lg bg-primary px-6 py-3">
          <Text className="text-base font-medium text-primary-foreground">Go to Sign In</Text>
        </Pressable>
      </Link>
    </View>
  );
}
