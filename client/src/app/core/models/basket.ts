import { createId } from "@paralleldrive/cuid2";

// For the basket_id, using CUID2 for security awareness
export interface BasketModel {
  id: string;
  orderTypeId: number;
  phoneNumber: string;
  promotionId?: number;
  clientSecret: string;
  paymentIntentId: string;
  items: BasketItemModel[];
}

// Represents for the product id as a DTO
export interface BasketItemModel {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
}

// A default class for a basket
export class BasketModel implements BasketModel {
  id: string = createId();
  items: BasketItemModel[] = [];
}
