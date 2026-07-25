import { useAuthStore } from "@/store/auth-store";
import { create, type AxiosError, type InternalAxiosRequestConfig } from "axios";

import type { ApiResponse } from "@/types/api-types";

export const apiClient = create({
  baseURL: `${process.env.EXPO_PUBLIC_API_BASE_URL}/v1`,
});

// Separate instance with no interceptors attached, used only for the refresh
// call itself so a failed/expired refresh can never re-enter apiClient's own
// 401 handling below and loop.
const refreshClient = create({
  baseURL: apiClient.defaults.baseURL,
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type RefreshTokensData = {
  accessToken: string;
};

// De-dupes concurrent 401s behind a single in-flight refresh call.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const { data } = await refreshClient.post<ApiResponse<RefreshTokensData>>("/auth/refresh-token", {
    refreshToken,
  });

  await useAuthStore.getState().setSession({
    accessToken: data.data.accessToken,
    refreshToken,
  });

  return data.data.accessToken;
};

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.set("Authorization", accessToken);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      await useAuthStore.getState().signOut();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken(refreshToken).finally(() => {
        refreshPromise = null;
      });
      const newAccessToken = await refreshPromise;

      originalRequest.headers.set("Authorization", newAccessToken);
      return apiClient(originalRequest);
    } catch (refreshError) {
      await useAuthStore.getState().signOut();
      return Promise.reject(refreshError);
    }
  }
);
