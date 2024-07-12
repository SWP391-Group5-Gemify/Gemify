import { createId } from '@paralleldrive/cuid2';
import { OrderItemGemModel, OrderTypeEnum } from './order.model';

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
  buybackItems: BasketItemBuybackModel[];
}

// Represents for the product id as a DTO
export interface BasketItemSellModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

// Buyback item in basket
export interface BasketItemBuybackModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
  goldWeight: number;
  goldTypeId?: number;
  subCategoryId?: number;
  gems: OrderItemGemModel[];
}

export interface BasketsSearchingCriteriaModel {
  id: string | undefined;
  searchPhoneNumber: string | undefined;
}

// A default, orderTypeId is 1
export class BasketModel implements BasketModel {
  id: string = createId();
  orderTypeId: OrderTypeEnum | number = OrderTypeEnum.SELL;
  saleItems: BasketItemSellModel[] = [];
  buybackItems: BasketItemBuybackModel[] = [];
}

// Model for Total money of Basket
export interface BasketSellTotalsModel {
  promotionDiscount?: number;
  membershipDiscount?: number;
  subTotal: number;
  total: number;
}

export interface BasketBuybackTotalsModel {
  goldWeight: number;
  askPrice: number;
  totalNormalGem?: number;
  totalRareGem?: number;
  total: number;
}
