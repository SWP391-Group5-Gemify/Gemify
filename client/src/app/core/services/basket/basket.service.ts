import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  BasketBuybackItemModel,
  BasketItemModel,
  BasketModel,
  BasketTotalsModel,
} from '../../models/basket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductModel } from '../../models/product.model';
import { OrderItemModel } from '../../models/order.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PromotionModel } from '../../models/promotion.model';

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

  // Calculate Total Basket Price
  public basketTotalPrice = signal<BasketTotalsModel>({
    subTotal: 0,
    total: 0,
    promotionDiscount: 0,
  });
  // ====================
  // == Lifecycle
  // ====================
  constructor(private httpClient: HttpClient) {}

  // ====================
  // == Methods
  // ====================

  // ================================ FOR A SINGLE BASKET ============================

  /**
   * Set PromotionId for a basket and basketTotalPrice
   * @param promotion
   */
  public setPromotionPrice(promotion: PromotionModel | undefined) {
    const basket = this.getCurrentBasketValue();

    if (basket) {
      basket.promotionId = !promotion ? undefined : promotion.id;
      let promotionDiscount = !promotion ? 0 : promotion.discount;
      this.basketTotalPrice.update((value) => ({
        ...value,
        promotionDiscount: promotionDiscount,
      }));

      // Calculate price and set the promotionId to the basket
      this.calculateTotalBasketPrice();
      this.setOrUpdateBasket(basket);
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
   * Delete a basket out from Redis
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
    item: ProductModel | BasketItemModel,
    quantity = 1
  ): void {
    // Check if ProductModel or BasketItemModel
    if (this.isProduct(item)) {
      item = this.mapProductItemToBasketItem(item);
    }

    // Check the current basket
    let basket = this.getCurrentBasketValue() ?? this.createBasket();

    // Update the basket's items when add or update the item
    basket.saleItems = this.addOrUpdateBasketItem(
      basket?.saleItems,
      item,
      quantity
    );

    // Update the basket into the basket source
    // the basket source will get that value immediately when the addItemToBasket triggered
    this.setOrUpdateBasket(basket);
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
   * Check the current basket
   * - If having basket, then add item to it
   * - if don't have basket, then create new basket with random id = cuid2
   *
   * Add or Update Buyback Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set to basket
   *
   * Default quantity is 1
   * @param item
   * @param price
   * @param goldWeight
   * @param quantity
   */
  public addBuybackItemToCurrentBasket(
    item: OrderItemModel,
    price: number,
    goldWeight: number,
    quantity = 1
  ): void {
    const buybackBasketItemToAdd = this.mapOrderItemToBasketBuybackItem(
      item,
      price,
      goldWeight
    );

    // Check the current basket
    let basket = this.getCurrentBasketValue() ?? this.createBasket();

    // Update the basket's buyback items when add or update the item
    basket.buybackItems = this.addOrUpdateBuybackBasketItem(
      basket?.buybackItems,
      buybackBasketItemToAdd,
      quantity
    );

    // Update the basket into the basket source
    // the basket source will get that value immediately when the addBuybackItemToBasket triggered
    this.setOrUpdateBasket(basket);
  }

  /**
   * Create an empty basket with phoneNumber
   * @param phoneNumber
   */
  public createEmptyBasketWithPhoneNumber(phoneNumber: string): void {
    const newBasket: BasketModel = new BasketModel();
    newBasket.phoneNumber = phoneNumber;
    this.setOrUpdateBasket(newBasket);
  }

  /**
   * By guarding the only property of ProductModel to determince if it's ProductModel or BasketItempModel
   */
  private isProduct(
    item: ProductModel | BasketItemModel
  ): item is ProductModel {
    return (item as ProductModel).description != undefined;
  }

  /**
   * Add or Update Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set
   * @param items
   * @param basketItemToAdd
   * @param quantity
   * @returns
   */
  private addOrUpdateBasketItem(
    items: BasketItemModel[],
    basketItemToAdd: BasketItemModel,
    quantity: number
  ): BasketItemModel[] {
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
   * Add or Update Buyback Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set
   * @param items
   * @param basketItemToAdd
   * @param quantity
   * @returns
   */
  private addOrUpdateBuybackBasketItem(
    items: BasketBuybackItemModel[],
    basketItemToAdd: BasketBuybackItemModel,
    quantity: number
  ): BasketBuybackItemModel[] {
    let targetBuybackBasketItem = items.find(
      (item) => item.id === basketItemToAdd.id
    );
    if (targetBuybackBasketItem) {
      targetBuybackBasketItem.quantity += quantity;
    } else {
      basketItemToAdd.quantity = quantity;
      items.push(basketItemToAdd);
    }
    return items;
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

  /**
   * Map the product item properties into the basket item properties
   * @param product
   * @returns
   */
  private mapProductItemToBasketItem(product: ProductModel): BasketItemModel {
    return {
      id: product.id,
      price: product.productPrice,
      productName: product.name,
      quantity: 0,
      pictureUrl: product.imageUrl,
    };
  }

  /**
   * Map the product item properties into the buyback asket item properties
   * @param orderItem
   * @param buybackPrice
   * @param goldWeight
   * @returns BasketBuybackItemModel
   */
  private mapOrderItemToBasketBuybackItem(
    orderItem: OrderItemModel,
    buybackPrice: number,
    goldWeight: number
  ): BasketBuybackItemModel {
    return {
      id: orderItem.id,
      price: buybackPrice,
      productName: orderItem.productName,
      quantity: 0,
      pictureUrl: orderItem.image_Url,
      goldWeight: goldWeight,
    };
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
  public generateTempTicketId(basketId: string, phoneNumber?: string): string {
    let tempTicketId: string = ''.concat(basketId.slice(0, 3)).toUpperCase();

    // If having phone number
    if (phoneNumber) {
      tempTicketId = tempTicketId.concat('-').concat(phoneNumber.slice(0, 4));
    }

    return tempTicketId;
  }

  /**
   * Calculate total price
   */
  public calculateTotalBasketPrice() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    const subTotal = basket.saleItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    this.basketTotalPrice.update((value) => ({
      promotionDiscount: value.promotionDiscount,
      subTotal: subTotal,
      total: subTotal * (1 - (value.promotionDiscount ?? 0)),
    }));
  }
}
