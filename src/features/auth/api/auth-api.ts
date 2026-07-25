import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type { AuthTokens, AuthUser, SignInPayload, SignInResponseData } from "../types";

// PLACEHOLDER — confirm endpoint paths, request/response field names against the real backend.
export const signIn = async (payload: SignInPayload): Promise<ApiResponse<SignInResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<SignInResponseData>>("/auth/signin", payload);

  return data;
};

export const refreshTokens = async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>("/auth/refresh", { refreshToken });

  return data;
};

export const fetchCurrentUser = async (): Promise<ApiResponse<AuthUser>> => {
  const { data } = await apiClient.get<ApiResponse<AuthUser>>("/auth/me");

  return data;
};
