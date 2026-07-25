import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text className="text-2xl font-medium text-red-500">Letss goo working finee</Text>

      <Link href="/brands" asChild>
        <Pressable className="rounded-lg bg-blue-600 px-6 py-3">
          <Text className="text-base font-medium text-white">Go to Brands</Text>
        </Pressable>
      </Link>

      <Link href="/profile" asChild>
        <Pressable className="rounded-lg bg-blue-600 px-6 py-3">
          <Text className="text-base font-medium text-white">Go to Profile</Text>
        </Pressable>
      </Link>

      <Link href="/(auth)/sign-in" asChild>
        <Pressable className="rounded-lg bg-blue-600 px-6 py-3">
          <Text className="text-base font-medium text-white">Go to Sign In</Text>
        </Pressable>
      </Link>
    </View>
  );
}
