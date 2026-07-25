export type Brand = {
  id: string;
  name: string;
  imgURL: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  activeStatus: "active" | "inactive";
};

export type BrandListMeta = {
  page: number;
  limit: number;
  total: number;
};

export type BrandListResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: BrandListMeta;
  data: Brand[];
};
