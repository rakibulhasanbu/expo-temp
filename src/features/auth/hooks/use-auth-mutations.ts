import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth-store";

import { signIn } from "../api/auth-api";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;
      await useAuthStore.getState().setSession({ accessToken, refreshToken });
    },
  });
};
