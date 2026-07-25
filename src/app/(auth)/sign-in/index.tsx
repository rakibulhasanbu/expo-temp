import { useSignInMutation } from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { router, useLocalSearchParams, type Href } from "expo-router";
import { useForm } from "react-hook-form";
import { Keyboard, Pressable, View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { Text } from "@/components/text";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
};

export default function SignIn() {
  const signInMutation = useSignInMutation();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const { control, handleSubmit } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    signInMutation.mutate(values, {
      onSuccess: () => router.replace((redirect ?? "/") as Href),
    });
  };

  return (
    <Pressable className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background flex-1 justify-center gap-4 px-6">
        <Text variant="h2" className="mb-4 text-center">
          Sign In
        </Text>

        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          secureTextEntry
        />

        <Button onPress={handleSubmit(onSubmit)} loading={signInMutation.isPending} className="mt-2">
          <Text>Submit</Text>
        </Button>

        <FormError
          message={signInMutation.isError ? getErrorMessage(signInMutation.error) : null}
          className="text-center"
        />
      </View>
    </Pressable>
  );
}
