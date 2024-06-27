import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CategoryModel,
  ProductModel,
  ProductsSearchingCriteriaModel,
  SubCategoryModel,
} from '../../models/product.model';
import { environment } from '../../../../environments/environment';
import { PaginationModel } from '../../models/pagination.model';
import ImageUtils from '../../../shared/utils/ImageUtils';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseProductUrl: string = environment.baseApiUrl.concat('/products');

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the list of products based on searching criteria
   * @param productSearchCriteria
   * @returns
   */
  getProducts(
    productSearchCriteria: ProductsSearchingCriteriaModel
  ): Observable<PaginationModel<ProductModel>> {
    let params = new HttpParams()
      .set('pageIndex', productSearchCriteria.pageIndex.toString())
      .set('pageSize', productSearchCriteria.pageSize.toString());

    // Assign params if exists
    if (productSearchCriteria.searchName) {
      params = params.set('search', productSearchCriteria.searchName);
    }
    if (productSearchCriteria.goldTypeId) {
      params = params.set(
        'goldTypeId',
        productSearchCriteria.goldTypeId.toString()
      );
    }
    if (productSearchCriteria.subCategoryId) {
      params = params.set(
        'subcategoryId',
        productSearchCriteria.subCategoryId.toString()
      );
    }
    if (productSearchCriteria.categoryId) {
      params = params.set(
        'categoryId',
        productSearchCriteria.categoryId.toString()
      );
    }
    if (productSearchCriteria.status) {
      params = params.set('status', productSearchCriteria.status);
    }
    if (productSearchCriteria.sortQuantity) {
      params = params.set('sort', productSearchCriteria.sortQuantity);
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
   * Update product information based on id
   * @param product
   * @returns
   */
  updateProduct(product: ProductModel): Observable<any> {
    return this.httpClient.put<ProductModel>(
      `${this.baseProductUrl}/${product.id}`,
      product
    );
  }

  /**
   * Disable Product based on id
   * @param id
   * @returns
   */
  disableProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseProductUrl}/${id}`);
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
}
