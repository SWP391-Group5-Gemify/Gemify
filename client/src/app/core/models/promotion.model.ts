export interface PromotionModel {
  id: number;
  name: string;
  expDate: Date | string;
  effDate: Date | string;
  discount: number;
  code: string;
  status: string;
}

export interface PromotionParams {
  pageSize: number;
  pageIndex: number;
  searchName?: string;
  status?: string;
}

export interface PromotionCreateModel {
  code: string;
  discount: number;
  name: string;
  expDate: Date | string;
}

export enum PromotionStatusEnum {
  Active = 'Còn Hiệu Lực',
  Expired = 'Hết Hạn',
}
