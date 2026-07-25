import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { fetchBrand, fetchBrands } from "../api/brand-api";

export const brandKeys = {
  all: ["brands"] as const,
  list: () => [...brandKeys.all, "list"] as const,
  detail: (id: string) => [...brandKeys.all, "detail", id] as const,
};

export const useBrandsQuery = () => {
  return useInfiniteQuery({
    queryKey: brandKeys.list(),
    queryFn: ({ pageParam }) => fetchBrands(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loadedCount = lastPage.meta.page * lastPage.meta.limit;
      return loadedCount < lastPage.meta.total ? lastPage.meta.page + 1 : undefined;
    },
    select: (data) => ({
      brands: data.pages.flatMap((page) => page.data),
      total: data.pages[0]?.meta.total ?? 0,
    }),
  });
};

export const useBrandQuery = (id: string) => {
  return useQuery({
    queryKey: brandKeys.detail(id),
    queryFn: () => fetchBrand(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};
