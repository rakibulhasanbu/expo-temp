import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [submittedValues, setSubmittedValues] = useState<SignInFormValues | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    setSubmittedValues(values);
  };

  return (
    <View className="flex-1 justify-center gap-4 bg-white px-6">
      <Text className="mb-4 text-center text-2xl font-semibold">Sign In</Text>

      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              className="rounded-lg border border-gray-300 px-4 py-3 text-base"
            />
          )}
        />
        {errors.email && <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>}
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Password"
              secureTextEntry
              className="rounded-lg border border-gray-300 px-4 py-3 text-base"
            />
          )}
        />
        {errors.password && <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>}
      </View>

      <Pressable onPress={handleSubmit(onSubmit)} className="mt-2 rounded-lg bg-blue-600 py-3">
        <Text className="text-center text-base font-medium text-white">Submit</Text>
      </Pressable>

      {submittedValues && (
        <View className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Text className="mb-2 font-medium">Submitted values:</Text>
          <Text className="text-gray-700">Email: {submittedValues.email}</Text>
          <Text className="text-gray-700">Password: {submittedValues.password}</Text>
        </View>
      )}
    </View>
  );
}
