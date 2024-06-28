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
  private baseProductUrl: string = environment.baseApiUrl.concat('/products');

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the list of products based on searching criteria
   * @param productsSearchCriteria
   * @returns
   */
  getProducts(
    productsSearchCriteria: ProductParams
  ): Observable<PaginationModel<ProductModel>> {
    let params = new HttpParams()
      .set('pageIndex', productsSearchCriteria.pageIndex.toString())
      .set('pageSize', productsSearchCriteria.pageSize.toString());

    // Assign params if exists
    if (productsSearchCriteria.searchName) {
      params = params.set('search', productsSearchCriteria.searchName);
    }

    if (productsSearchCriteria.goldTypeId) {
      params = params.set(
        'goldTypeId',
        productsSearchCriteria.goldTypeId.toString()
      );
    }

    if (productsSearchCriteria.subCategoryId) {
      params = params.set(
        'subcategoryId',
        productsSearchCriteria.subCategoryId.toString()
      );
    }

    if (productsSearchCriteria.categoryId) {
      params = params.set(
        'categoryId',
        productsSearchCriteria.categoryId.toString()
      );
    }

    if (productsSearchCriteria.status) {
      params = params.set('status', productsSearchCriteria.status);
    }

    if (productsSearchCriteria.sortQuantity) {
      params = params.set('sort', productsSearchCriteria.sortQuantity);
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
