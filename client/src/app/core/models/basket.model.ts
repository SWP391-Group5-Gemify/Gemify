import { createId } from '@paralleldrive/cuid2';
import { OrderTypeEnum } from './order.model';

// For the basket_id, using CUID2 for security awareness
export interface BasketModel {
  id: string;
  orderTypeId: number | OrderTypeEnum;
  phoneNumber: string;
  promotionId?: number;
  clientSecret?: string;
  membershipId?: number;
  paymentIntentId?: string;
  saleItems: BasketItemSellModel[];
  buybackItems: BasketItemBuyBackModel[];
}

// Represents for the product id as a DTO
export interface BasketItemSellModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

interface GemBuyBackModel {
  gemId: number | string;
  gemPrice: number;
  gemName: string;
}

// Buyback item for Outdoor and Indoor
export interface BasketItemBuyBackModel {
  id: string | number;
  productName: string;
  goldWeight: number;
  price: number;
  pictureUrl: string;
  quantity: number;
  goldTypeId?: number;
  subCategoryId?: number;
  gems?: GemBuyBackModel[];
}

export class BasketItemBuyBackModel implements BasketItemBuyBackModel {
  id: string | number = 1;
}

export interface BasketParams {
  id: string | undefined;
  searchPhoneNumber?: string;
  orderTypeId?: number;
}

// A default, orderTypeId is 1
export class BasketModel implements BasketModel {
  id: string = createId();
  orderTypeId: OrderTypeEnum | number = OrderTypeEnum.SELL;
  saleItems: BasketItemSellModel[] = [];
  buybackItems: BasketItemBuyBackModel[] = [];
}

// = MODELS FOR PRICE ======================================================================

// Model for Total money of Basket
export interface BasketSellTotalsModel {
  promotionDiscount?: number;
  membershipDiscount?: number;
  subTotal: number;
  total: number;
}

export interface BasketBuyBackTotalsModel {
  totalGoldsWeight: number;
  totalGoldsPrice: number;
  totalRareGemsPrice: number;
  total: number;
}

export interface BasketExchangeTotalsModel {
  totalSells: number;
  totalBuyBacks: number;
  total: number;
}
