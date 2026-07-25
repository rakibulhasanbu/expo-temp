export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<TData> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: TData;
};

export type ApiListResponse<TData> = ApiResponse<TData[]> & {
  meta: ApiMeta;
};
