import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  BasketItemBuybackModel,
  BasketItemSellModel as BasketSellItemModel,
  BasketModel,
  BasketSellTotalsModel,
  BasketItemSellModel,
} from '../../models/basket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductModel } from '../../models/product.model';
import { OrderItemModel, OrderTypeEnum } from '../../models/order.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PromotionModel } from '../../models/promotion.model';
import { CustomerModel } from '../../models/customer.model';
import { MembershipService } from '../membership/membership.service';
import { NumberSymbol } from '@angular/common';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  // ====================
  // == Fields
  // ====================
  private baseBasketUrl: string = environment.baseApiUrl.concat('/basket');
  private basePaymentUrl: string = environment.baseApiUrl.concat('/payments');

  private readonly LOCAL_STORAGE_BASKET_ID: string = 'basket_id';

  // Create a singleton for the basket source, which will be accessed
  // from everywhere, initial value is null
  private _basketSource = new BehaviorSubject<BasketModel | null>(null);
  public basketSource$ = this._basketSource.asObservable();

  // Calculate Total Sell Basket Price
  public basketSellTotalPrice = signal<BasketSellTotalsModel>({
    subTotal: 0,
    total: 0,
    promotionDiscount: 0,
    membershipDiscount: 0,
  });

  // Calculate Total Sell Basket Price
  public basketBuybackTotalPrice = signal<BasketSellTotalsModel>({
    subTotal: 0,
    total: 0,
    promotionDiscount: 0,
    membershipDiscount: 0,
  });

  // ====================
  // == Lifecycle
  // ====================
  constructor(
    private httpClient: HttpClient,
    private membershipService: MembershipService
  ) {}

  // ====================
  // == Methods
  // ====================

  // ================================ FOR A SINGLE BASKET ============================

  /**
   * Set PromotionId for a basket and basketTotalPrice
   * @param promotion
   */
  public setPromotionId(promotion: PromotionModel | undefined) {
    const basket = this.getCurrentBasketValue();

    if (basket) {
      basket.promotionId = !promotion ? undefined : promotion.id;
      let promotionDiscount = !promotion ? 0 : promotion.discount;
      this.basketSellTotalPrice.update((value) => ({
        ...value,
        promotionDiscount: promotionDiscount,
      }));

      // Calculate price and set the promotionId to the basket
      this.calculateTotalBasketSellPrice();
      this.setOrUpdateBasket(basket);
    }
  }

  /**
   * Set the membershipId and its discount on passed in customer
   * @param customer
   */
  public setMembershipId(customer: CustomerModel | undefined) {
    const basket = this.getCurrentBasketValue();

    // always set to 1 by default

    if (basket) {
      basket.membershipId = !customer ? 1 : customer.membershipId;

      // Get discount value
      this.membershipService
        .getMembershipById(basket.membershipId)
        .pipe(untilDestroyed(this))
        .subscribe((membership) => {
          let membershipDiscount = membership.discount;

          this.basketSellTotalPrice.update((value) => ({
            ...value,
            membershipDiscount: membershipDiscount,
          }));

          // Calculate price and set the membershipId to the basket
          this.calculateTotalBasketSellPrice();
          this.setOrUpdateBasket(basket);
        });
    }
  }

  /**
   * Create a payment intent
   * @returns
   */
  public createPaymentIntent(basketId: number | string) {
    return this.httpClient
      .post<BasketModel>(`${this.basePaymentUrl}/${basketId}`, {})
      .pipe(
        map((basket) => {
          console.table(basket);
          this._basketSource.next(basket);
        })
      );
  }

  /**
   * Switching the target into current basket
   * @param basket
   */
  public selectBasketBeCurrentBasket(basket: BasketModel) {
    this._basketSource.next(basket);
    localStorage.setItem(this.LOCAL_STORAGE_BASKET_ID, basket.id);
  }

  /**
   * Load a basket by id into the basket source
   * @param id
   * @returns
   */
  public loadBasketById(id: string) {
    return this.httpClient
      .get<BasketModel>(`${this.baseBasketUrl}/${id}`)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (basket) => this._basketSource.next(basket),
      });
  }

  /**
   * Load a basket by id without setting to the basket source
   * @param id
   * @returns
   */
  public getBasketById(id: string): Observable<BasketModel> {
    return this.httpClient.get<BasketModel>(`${this.baseBasketUrl}/${id}`);
  }

  /**
   * Getter of basketId
   */
  public get currentBasketIdLocalStorage() {
    return localStorage.getItem(this.LOCAL_STORAGE_BASKET_ID);
  }

  /**
   * Set into the basket source after the post is successful
   * Update that basket info
   * @param basket
   * @returns
   */
  public setOrUpdateBasket(updatedBasket: BasketModel) {
    return this.httpClient
      .post<BasketModel>(this.baseBasketUrl, updatedBasket)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (basket) => {
          console.log('BEFORE NEXT: ', basket);

          this._basketSource.next(basket);

          console.log('AFTER NEXT: ', this._basketSource.getValue());
        },
      });
  }

  /**
   * Delete a basket out from Redis and current Storage
   * - If it's a current basket in the basket source, then set the current basket source to null
   * @param id
   * @returns
   */
  public deleteBasket(id: number | string): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('id', id.toString());

    return this.httpClient
      .delete<boolean>(this.baseBasketUrl, {
        params: params,
      })
      .pipe(
        tap(() => {
          // Perform remove the current basket source and its localStorage
          if (this.getCurrentBasketValue()?.id === id) {
            this._basketSource.next(null);
            localStorage.removeItem(this.LOCAL_STORAGE_BASKET_ID);
          }
        })
      );
  }

  /**
   * TODO: Remove item from the basket
   */
  // public removeItemFromBasket(id: number, quantity = 1): void {
  //   let basket = this.getCurrentBasketValue();

  //   if (!basket) return;

  //   const item = basket?.saleItems.find((x) => x.id === id);

  //   // If having items
  //   if (item) {
  //     item.quantity -= quantity;

  //     // if quantity = 0, then filter out that item
  //     if (item.quantity === 0) {
  //       basket.saleItems = basket.saleItems.filter((x) => x.id !== id);
  //     }

  //     // Set the basket's state back into the redis
  //     if (basket.saleItems.length > 0) {
  //       this.setOrUpdateBasket(basket);
  //     } else {
  //       this.deleteBasket(basket.id).subscribe();
  //     }
  //   }
  // }

  /**
   * Create an empty basket with phoneNumber
   * @param phoneNumber
   */
  public createEmptyBasketWithPhoneNumber(
    phoneNumber: string,
    orderTypeId?: OrderTypeEnum | number
  ): void {
    const newBasket: BasketModel = new BasketModel();
    newBasket.phoneNumber = phoneNumber;
    newBasket.orderTypeId = orderTypeId ?? OrderTypeEnum.SELL;
    this.setOrUpdateBasket(newBasket);
  }

  /**
   * Add or Update Item to Basket (Generic Function)
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set
   * @param items
   * @param basketItemToAdd
   * @param quantity
   * @returns
   */
  private addOrUpdateBasketItem<
    T extends { id: string | number; quantity: number }
  >(items: T[], basketItemToAdd: T, quantity: number): T[] {
    let targetBasketItem = items.find((item) => item.id === basketItemToAdd.id);
    if (targetBasketItem) {
      targetBasketItem.quantity += quantity;
    } else {
      basketItemToAdd.quantity = quantity;
      items.push(basketItemToAdd);
    }
    return items;
  }

  /**
   * Get the current basket value
   */
  public getCurrentBasketValue(): BasketModel | null {
    return this._basketSource.getValue();
  }

  /**
   * Create a new basket with default basket_id = cuid2
   * Set it into the basket_id
   */
  private createBasket(): BasketModel {
    const basket = new BasketModel();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  // ================================ FOR A LIST OF SELL BASKET ============================
  /**
   * By guarding the only property of ProductModel to determince if it's ProductModel or BasketItempModel
   */
  private isProduct(
    item: ProductModel | BasketSellItemModel
  ): item is ProductModel {
    return (item as ProductModel).description != undefined;
  }

  /**
   * Map the product item properties into the basket item properties
   * @param product
   * @returns
   */
  private mapProductItemToBasketItemSell(
    product: ProductModel
  ): BasketItemSellModel {
    return {
      id: product.id,
      price: product.productPrice,
      productName: product.name,
      quantity: 0,
      pictureUrl: product.imageUrl,
    };
  }
  /**
   * Check the current basket
   * - If having basket, then add item to it
   * - if don't have basket, then create new basket with random id = cuid2
   *
   * Add or Update Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set to basket
   *
   * Default quantity is 1
   * @param item
   * @param quantity
   */
  public addItemToCurrentBasket(
    item: ProductModel | BasketItemSellModel,
    quantity = 1
  ): void {
    // Check if ProductModel or BasketItemModel
    if (this.isProduct(item)) {
      item = this.mapProductItemToBasketItemSell(item);
    }

    // Check the current basket
    let basket = this.getCurrentBasketValue() ?? this.createBasket();

    // Update the basket's items when add or update the item
    basket.saleItems = this.addOrUpdateBasketItem<BasketItemSellModel>(
      basket?.saleItems,
      item,
      quantity
    );

    // Update the basket into the basket source
    // the basket source will get that value immediately when the addItemToBasket triggered
    this.setOrUpdateBasket(basket);
  }
  // ================================ FOR A LIST OF BUY BACK BASKET ============================

  /**
   * Map the product item properties into the buyback asket item properties
   * @param orderItem
   * @param buybackPrice
   * @param goldWeight
   * @returns BasketBuybackItemModel
   */
  private mapOrderItemToBasketItemBuyback(
    orderItem: OrderItemModel,
    buybackPriceAfter: number,
    goldWeightAfter: number,
    goldTypeId: number,
    subCategoryId: number
  ): BasketItemBuybackModel {
    return {
      id: orderItem.id,
      productName: orderItem.productName,
      price: buybackPriceAfter,
      quantity: 0,
      pictureUrl: orderItem.image_Url,
      goldWeight: goldWeightAfter,
      goldTypeId: goldTypeId,
      subCategoryId: subCategoryId,
    };
  }

  /**
   * Check the current basket
   * - If having basket, then add item to it
   * - if don't have basket, then create new basket with random id = cuid2
   *
   * Add or Update Buyback Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set to basket
   *
   * @param item
   * @param price
   * @param goldWeight
   * @param quantity
   * @param goldTypeId
   * @param subCategoryId
   */
  public addOrderItemToCurrentBasket(
    item: OrderItemModel,
    quantity = 1,
    buybackPriceAfter: number,
    goldWeightAfter: number,
    goldTypeId: number,
    subCategoryId: number
  ): void {
    const buybackBasketItemToAdd = this.mapOrderItemToBasketItemBuyback(
      item,
      buybackPriceAfter,
      goldWeightAfter,
      goldTypeId,
      subCategoryId
    );

    // Check the current basket
    let basket = this.getCurrentBasketValue() ?? this.createBasket();

    // Update the basket's buyback items when add or update the item
    basket.buybackItems = this.addOrUpdateBasketItem<BasketItemBuybackModel>(
      basket?.buybackItems,
      buybackBasketItemToAdd,
      quantity
    );

    // Update the basket into the basket source
    // the basket source will get that value immediately when the addBuybackItemToBasket triggered
    this.setOrUpdateBasket(basket);
  }

  // ================================ FOR A LIST OF BASKET ============================

  /**
   * Get a list of baskets within the redis
   * @returns
   */
  public getBaskets() {
    return this.httpClient.get<BasketModel[]>(this.baseBasketUrl);
  }

  /**
   * Generate Temp ticket id For customer preference in store
   * @param customerName
   * @returns
   */
  public generateTempTicketId(basket: BasketModel): string {
    let tempTicketId: string = '';

    switch (basket.orderTypeId) {
      case OrderTypeEnum.SELL: {
        tempTicketId = tempTicketId.concat('S-');
        break;
      }
      case OrderTypeEnum.BUYBACK: {
        tempTicketId = tempTicketId.concat('BB-');
        break;
      }
      case OrderTypeEnum.EXCHANGE: {
        tempTicketId = tempTicketId.concat('EX-');
        break;
      }
    }

    // Appending phone slicing from 0th to 4th
    tempTicketId = tempTicketId.concat(basket.phoneNumber.slice(0, 4));

    return tempTicketId;
  }

  /**
   * Calculate total price
   */
  public calculateTotalBasketSellPrice() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    const subTotal = basket.saleItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    this.basketSellTotalPrice.update((value) => ({
      promotionDiscount: value.promotionDiscount,
      membershipDiscount: value.membershipDiscount,
      subTotal: subTotal,
      total:
        subTotal *
        (1 - (value.promotionDiscount ?? 0) - (value.membershipDiscount ?? 0)),
    }));
  }
}
