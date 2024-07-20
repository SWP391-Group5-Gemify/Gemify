export interface OrderModel {
  id: number;
  orderDate: string;
  status: string;
  orderTypeId: number;
  orderType: string;
  subTotal: number;
  total: number;
  name: string;
  phone: string;
  membershipName: string;
  membershipDiscount: number;
  userId: number;
  paymentIntentId: string;
  promotionCode?: any;
  promotionDiscount: number;
  orderItems: OrderItemModel[];
}

export interface OrderItemModel {
  id: number;
  productItemId: number;
  productName: string;
  goldTypeId: number;
  goldPrice: number;
  goldTypeName: string;
  goldWeight: number;
  productLabour: number;
  unit: string;
  image_Url: string;
  price: number;
  quantity: number;
  orderItemGems: OrderItemGemModel[];
}

export interface OrderItemGemModel {
  gemName: string;
  gemColor: string;
  gemWeight: number;
  gemCarat: number;
  gemClarity: string;
  gemCertificateCode?: any;
  isProcurable: boolean;
  price: number;
  quantity: number;
}

export class OrderParams {
  search: string | undefined = '';
  pageIndex = 1;
  pageSize = 10;
  orderTypeId: number | OrderTypeEnum = 0;
}

export interface OrderTypeModel {
  id: number;
  name: string;
}

export enum OrderTypeEnum {
  SELL = 1,
  BUYBACK = 2,
  EXCHANGE = 3,
}
