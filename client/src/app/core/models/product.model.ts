export interface ProductModel {
  id: number;
  name: string;
  description: string;
  goldType: string;
  goldWeight: number;
  latestBidPrice: number;
  totalWeight: number;
  labour: number;
  status: string;
  quantity: number;
  imageUrl: string;
  subCategoryName: string;
  categoryName: string;
  saleCounterName: string;
  gems: GemModel[];
  productPrice: number;
}

export interface GemModel {
  gemTypeId: number;
  name: string;
  description: string;
  proportion: number;
  polish: string;
  fluorescence: string;
  symmetry: string;
  carat: number;
  cut: string;
  clarity: string;
  color: string;
  shape: string;
  latestPrice: number;
  gemWeight: number;
  certificateCode?: string;
  quantity: number;
  gemsPrice: number;
}

export interface CategoryModel {
  id: number;
  name: string;
  subCategories: SubCategoryModel[];
}

export interface SubCategoryModel {
  id: number;
  name: string;
  unit: string;
}

export interface ProductsSearchingCriteriaModel {
  pageSize: number;
  pageIndex: number;
  search: string | undefined;
  goldTypeId: number | string | undefined;
  subCategoryId: number | string | undefined;
  sortQuantity: string | undefined;
}

export enum ProductStatusEnum {
  Unavailable = 'Unavailable',
  Available = 'Available',
}

export enum SortProductsQuantityEnum {
  QuantityDesc = 'quantityDesc',
  QuantityAsc = 'quantityAsc',
}
