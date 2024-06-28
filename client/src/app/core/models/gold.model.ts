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
  timestamp: number;
  metal: string;
  currency: string;
  exchange: string;
  symbol: string;
  prev_close_price: number;
  open_price: number;
  low_price: number;
  high_price: number;
  open_time: number;
  price: number;
  ch: number;
  chp: number;
  ask: number;
  bid: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_21k: number;
  price_gram_20k: number;
  price_gram_18k: number;
  price_gram_16k: number;
  price_gram_14k: number;
  price_gram_10k: number;
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