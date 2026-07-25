import { create } from "axios";

export const apiClient = create({
  baseURL: `${process.env.EXPO_PUBLIC_API_BASE_URL}/v1`,
});
