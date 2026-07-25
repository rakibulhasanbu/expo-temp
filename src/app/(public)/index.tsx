import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ProtectedLink } from "@/components/protected-link";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <ThemeSwitcher />

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
