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

    // Assign params if existences
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
    if (productSearchCriteria.sortQuantity) {
      params = params.set('sort', productSearchCriteria.sortQuantity);
    }

    return this.httpClient.get<PaginationModel<ProductModel>>(
      this.baseProductUrl,
      { params: params }
    );
  }

  /**
   * Get the product by id
   * @param id
   * @returns
   */
  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.baseProductUrl}/${id}/`);
  }

  /**
   * Update product information based on id
   * @param product
   * @returns
   */
  updateProduct(product: ProductModel): any {
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
  disableProduct(id: number): any {
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
