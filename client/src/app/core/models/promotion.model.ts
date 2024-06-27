export interface PromotionModel {
  id: number;
  name: string;
  expDate: string;
  effDate: string;
  discount: number;
  code: string;
  status: boolean;
}

export interface PromotionsSearchingCriteriaModel {
  pageSize: number;
  pageIndex: number;
  searchName: string | undefined;
}

export interface PromotionCreateModel {}
