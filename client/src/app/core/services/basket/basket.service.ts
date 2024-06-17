import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { BasketItemModel, BasketModel } from "../../models/basket";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProductModel } from "../../models/product.model";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  // ====================
  // == Fields
  // ====================
  private baseBasketUrl: string = environment.baseApiUrl.concat("/basket");
  private readonly LOCAL_STORAGE_BASKET_ID: string = "basket_id";

  // Create a singleton for the basket source, which will be accessed
  // from everywhere, initial value is null
  private _basketSource = new BehaviorSubject<BasketModel | null>(null);
  public basketSource$ = this._basketSource.asObservable();

  // ====================
  // == Lifecycle
  // ====================
  constructor(private httpClient: HttpClient) {}

  // ====================
  // == Methods
  // ====================
  /**
   * Get a specific basket based on id, and set to the singleton
   * @param id
   * @returns
   */
  public getBasket(id: string) {
    return this.httpClient
      .get<BasketModel>(`${this.baseBasketUrl}/${id}`)
      .subscribe({
        next: (basket) => this._basketSource.next(basket),
      });
  }

  /**
   * Getter of basketId
   */
  public get basketId() {
    return localStorage.getItem(this.LOCAL_STORAGE_BASKET_ID);
  }

  /**
   * Set or Update the current existing basket
   * @param basket
   * @returns
   */
  public setBasket(basket: BasketModel) {
    return this.httpClient
      .post<BasketModel>(this.baseBasketUrl, basket)
      .subscribe({
        next: (basket) => {
          this._basketSource.next(basket);
        },
      });
  }

  /**
   * Get the current basket value
   */
  public getCurrentBasketValue(): BasketModel | null {
    return this._basketSource.value;
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
  public addItemToBasket(item: ProductModel, quantity = 1): void {
    const basketItemToAdd = this.mapProductItemToBasketItem(item);

    // Check the current basket
    let basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.table(this.getCurrentBasketValue());
    console.table(this.getCurrentBasketValue());

    // Update the basket's items when add or update the item
    basket.items = this.addOrUpdateItem(
      basket?.items,
      basketItemToAdd,
      quantity
    );

    // Update the basket into the basket source
    this.setBasket(basket);
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

  private addOrUpdateItem(
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
   * Create a new basket with default basket_id = cuid2
   */
  private createBasket(): BasketModel {
    const basket = new BasketModel();
    localStorage.setItem("basket_id", basket.id);
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
}
