import { apiClient } from "@/lib/api-client";

import type { BrandListResponse } from "../types";

export const BRAND_PAGE_LIMIT = 10;

export const fetchBrands = async (page: number): Promise<BrandListResponse> => {
  const { data } = await apiClient.get<BrandListResponse>("/brand", {
    params: { page, limit: BRAND_PAGE_LIMIT },
  });

  return data;
};
