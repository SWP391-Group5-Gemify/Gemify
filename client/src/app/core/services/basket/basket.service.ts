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
  baseBasketUrl: string = environment.baseApiUrl;

  // Create a singleton for the basket source, which will be accessed
  // from everywhere, initial value is null
  private _basketSource = new BehaviorSubject<BasketModel | null>(null);
  basketSource$ = this._basketSource.asObservable();

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
  getBasket(id: string) {
    let params = new HttpParams();
    params.set("id", id);
    return this.httpClient
      .get<BasketModel>(this.baseBasketUrl, { params })
      .subscribe({
        next: (basket) => this._basketSource.next(basket),
      });
  }

  /**
   * Set or Update the current existing basket
   * @param basket
   * @returns
   */
  setBasket(basket: BasketModel) {
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
  getCurrentBasketValue(): BasketModel | null {
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
  addItemToBasket(item: ProductModel, quantity = 1): void {
    const itemToAdd = this.mapProductItemToBasketItem(item);

    // Check the current basket
    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    // Update the basket's items when add or update the item
    basket.items = this.addOrUpdateItem(basket?.items, itemToAdd, quantity);

    // Update the basket into the basket source
    this.setBasket(basket);
  }

  /**
   * Add or Update Item to Basket
   * - Scenario 1: item is existed, then update the quantity
   * - Scenario 2: item is not existed, then add to the list of basket, and set
   * @param items
   * @param itemToAdd
   * @param quantity
   * @returns
   */
  addOrUpdateItem(
    items: BasketItemModel[],
    itemToAdd: BasketItemModel,
    quantity: number
  ): BasketItemModel[] {
    const targetItem = items.find((item) => item.id === itemToAdd.id);
    if (targetItem) {
      targetItem.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  // Create a new basket with default basket_id = cuid2
  private createBasket(): BasketModel {
    const basket = new BasketModel();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }

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
