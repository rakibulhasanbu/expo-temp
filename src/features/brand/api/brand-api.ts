import { DEFAULT_PAGE_LIMIT, type ApiListResponse, type ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type { Brand, CreateBrandPayload, UpdateBrandPayload } from "../types";

export const fetchBrands = async (page: number): Promise<ApiListResponse<Brand>> => {
  const { data } = await apiClient.get<ApiListResponse<Brand>>("/brand", {
    params: { page, limit: DEFAULT_PAGE_LIMIT },
  });

  return data;
};

export const fetchBrand = async (id: string): Promise<ApiResponse<Brand>> => {
  const { data } = await apiClient.get<ApiResponse<Brand>>(`/brand/${id}`);

  return data;
};

export const createBrand = async (payload: CreateBrandPayload): Promise<ApiResponse<Brand>> => {
  const { data } = await apiClient.post<ApiResponse<Brand>>("/brand", payload);

  return data;
};

export const updateBrand = async (id: string, payload: UpdateBrandPayload): Promise<ApiResponse<Brand>> => {
  const { data } = await apiClient.patch<ApiResponse<Brand>>(`/brand/${id}`, payload);

  return data;
};

export const deleteBrand = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/brand/${id}`);

  return data;
};
