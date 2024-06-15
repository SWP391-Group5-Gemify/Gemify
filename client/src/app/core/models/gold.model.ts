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
