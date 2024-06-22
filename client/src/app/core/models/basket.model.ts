import { createId } from '@paralleldrive/cuid2';
import { BasketService } from '../services/basket/basket.service';

// For the basket_id, using CUID2 for security awareness
export interface BasketModel {
  id: string;
  orderTypeId: number;
  phoneNumber: string;
  promotionId?: number;
  clientSecret: string;
  paymentIntentId: string;
  saleItems: BasketItemModel[];
  buybackItems: BasketItemModel[];
}

// Represents for the product id as a DTO
export interface BasketItemModel {
  id: number;
  pictureUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface BasketsSearchingCriteriaModel {
  id: string | undefined;
  searchPhoneNumber: string | undefined;
}

// A default class for a basket
export class BasketModel implements BasketModel {
  id: string = createId();
  saleItems: BasketItemModel[] = [];
  buybackItems: BasketItemModel[] = [];
}
