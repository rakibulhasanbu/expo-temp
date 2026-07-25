import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchBrands } from "../lib/brand-api";

export const brandKeys = {
  all: ["brands"] as const,
  list: () => [...brandKeys.all, "list"] as const,
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
