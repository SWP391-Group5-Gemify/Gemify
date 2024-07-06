import { createId } from '@paralleldrive/cuid2';
import { BasketService } from '../services/basket/basket.service';

// For the basket_id, using CUID2 for security awareness
export interface BasketModel {
  id: string;
  orderTypeId: number;
  phoneNumber: string;
  promotionId?: number;
  clientSecret?: string;
  paymentIntentId?: string;
  saleItems: BasketItemModel[];
  buybackItems: BasketBuybackItemModel[];
}

// Represents for the product id as a DTO
export interface BasketItemModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

// Buyback item in basket
export interface BasketBuybackItemModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
  goldWeight: number;
}

export interface BasketsSearchingCriteriaModel {
  id: string | undefined;
  searchPhoneNumber: string | undefined;
}

// A default, orderTypeId is 1
export class BasketModel implements BasketModel {
  id: string = createId();
  orderTypeId: number = 1;
  saleItems: BasketItemModel[] = [];
  buybackItems: BasketBuybackItemModel[] = [];
}

// Model for Total money of Basket
export interface BasketTotalsModel {
  promotionDiscount?: number;
  subTotal: number;
  total: number;
}
