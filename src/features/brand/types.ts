export type BrandActiveStatus = "active" | "inactive";

export type Brand = {
  id: string;
  name: string;
  imgURL: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  activeStatus: BrandActiveStatus;
};

export type CreateBrandPayload = Pick<Brand, "name" | "imgURL" | "shopId">;

export type UpdateBrandPayload = Partial<CreateBrandPayload>;
