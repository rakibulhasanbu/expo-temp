import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBrand, deleteBrand, updateBrand } from "../api/brand-api";
import { brandKeys } from "./use-brand-queries";
import type { UpdateBrandPayload } from "../types";

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.list() });
    },
  });
};

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBrandPayload }) => updateBrand(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: brandKeys.list() });
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(variables.id) });
    },
  });
};

export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.list() });
    },
  });
};
