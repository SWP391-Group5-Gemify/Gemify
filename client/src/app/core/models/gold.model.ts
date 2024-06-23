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
