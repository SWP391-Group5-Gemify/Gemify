import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CategoryModel,
  ProductModel,
  ProductParams as ProductParams,
  SubCategoryModel,
} from '../../models/product.model';
import { environment } from '../../../../environments/environment';
import { PaginationModel } from '../../models/pagination.model';
import ImageUtils from '../../../shared/utils/ImageUtils';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // ========================
  // == Fields
  // ========================
  private baseProductUrl: string = environment.baseApiUrl.concat('/products');

  // ========================
  // == Constructors
  // ========================
  constructor(private httpClient: HttpClient) {}

  // ========================
  // == Methods
  // ========================
  /**
   * Get the list of products based on searching criteria
   * @param productsParams
   * @returns
   */
  getProducts(
    productsParams: ProductParams
  ): Observable<PaginationModel<ProductModel>> {
    let params = new HttpParams()
      .set('pageIndex', productsParams.pageIndex.toString())
      .set('pageSize', productsParams.pageSize.toString());

    // Assign params if exists
    if (productsParams.searchName) {
      params = params.set('search', productsParams.searchName);
    }

    // If having goldType Id
    if (productsParams.goldTypeId) {
      params = params.set('goldTypeId', productsParams.goldTypeId.toString());
    }

    // If having subCategoryId
    if (productsParams.subCategoryId) {
      params = params.set(
        'subcategoryId',
        productsParams.subCategoryId.toString()
      );
    }

    // If having categoryId
    if (productsParams.categoryId) {
      params = params.set('categoryId', productsParams.categoryId.toString());
    }

    // If having status
    if (productsParams.status) {
      params = params.set('status', productsParams.status);
    }

    // If having sort quantity
    if (productsParams.sortQuantity) {
      params = params.set('sort', productsParams.sortQuantity);
    }

    return this.httpClient
      .get<PaginationModel<ProductModel>>(this.baseProductUrl, {
        params: params,
      })
      .pipe(
        map((paginationModel) => {
          // Transform each product's imageUrl using ImageUtils.concatLinkToTokenFirebase
          paginationModel.data.forEach((product) => {
            product.imageUrl = ImageUtils.concatLinkToTokenFirebase(
              product.imageUrl
            );
          });
          return paginationModel;
        })
      );
  }

  /**
   * Get the product by id
   * @param id
   * @returns
   */
  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient
      .get<ProductModel>(`${this.baseProductUrl}/${id}/`)
      .pipe(
        map((product) => {
          return {
            ...product,
            imageUrl: ImageUtils.concatLinkToTokenFirebase(product.imageUrl),
          };
        })
      );
  }

  /**
   * Get the list of categories
   * @returns
   */
  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(
      this.baseProductUrl.concat('/categories')
    );
  }

  /**
   * Get the Subcategories by reducing the array of Categories
   * in to the array of SubCategories
   * @returns
   */
  getSubCategories(): Observable<SubCategoryModel[]> {
    return this.httpClient
      .get<CategoryModel[]>(this.baseProductUrl.concat('/categories'))
      .pipe(
        map((categories: CategoryModel[]) => {
          return categories.reduce(
            (acc: SubCategoryModel[], curr: CategoryModel) => {
              return acc.concat(curr.subCategories);
            },
            []
          );
        })
      );
  }

  /**
   * Update product information based on id
   * @param product
   * @returns
   */
  updateProduct(
    product: ProductModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.put<CreateUpdateDeleteResponseModel>(
      `${this.baseProductUrl}/${product.id}`,
      product
    );
  }

  /**
   * Disable Product based on id
   * @param id
   * @returns
   */
  disableProduct(id: number): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.delete<CreateUpdateDeleteResponseModel>(
      `${this.baseProductUrl}/${id}`
    );
  }
}
