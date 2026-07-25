import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text className="text-2xl font-medium text-red-500">Profile Page</Text>

      <SignOutButton />
    </View>
  );
}
