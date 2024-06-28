export interface LatestGoldPricesModel {
  name: string;
  latestBidPrice: number;
  latestAskPrice: number;
  content: number;
}

export interface GoldModel {
  id: number;
  name: string;
  latestBidPrice: number;
  latestAskPrice: number;
  unit: string;
  status: boolean;
  content: number;
}

export interface GoldPricesModel {
  goldTypeId: number;
  bidPrice: number;
  askPrice: number;
  dateTime: Date | string;
}

export interface UpdateGoldPricesModel {
  goldTypeId: number;
  bidPrice: number;
  askPrice: number;
}

export interface GoldsSearchingCriteriaModel {
  pageIndex: number;
  pageSize: number;
  goldTypeId: number | string;
  dateTime: Date | string;
}

export interface WorldGoldPrice {
  symbol: string;
  name: string;
  price: number;
  updatedAt: string;
  updatedAtReadable: string;
}

export interface Currency {
  meta: Meta;
  data: Data;
}

export interface Data {
  VND: VND;
}

export interface VND {
  code: string;
  value: number;
}

export interface Meta {
  last_updated_at: string;
}