import "@/global.css";

import { HydrationProvider } from "@/providers/hydration-provider";
import { AuthStatus } from "@/store/auth-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { queryClient } from "@/lib/query-client";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />

          <Stack.Protected guard={status === AuthStatus.Authenticated}>
            <Stack.Screen name="(protected)" />
          </Stack.Protected>

          <Stack.Protected guard={status !== AuthStatus.Authenticated}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      </HydrationProvider>
    </QueryClientProvider>
  );
}
