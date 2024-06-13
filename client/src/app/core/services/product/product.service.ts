import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel, ProductModel } from '../../models/product.model';
import { environment } from '../../../../environments/environment';
import { PaginationModel } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseProductUrl: string = environment.baseApiUrl.concat('/products');

  constructor(private httpClient: HttpClient) {}

  /**
   * Get products on paging
   * @param pageIndex
   * @param pageSize
   * @param search
   * @param goldTypeId
   * @param categoryId
   * @param subcategoryId
   * @param sort
   * @returns
   */
  getProducts(
    pageIndex: number,
    pageSize: number,
    search?: string,
    goldTypeId?: number,
    categoryId?: number,
    subcategoryId?: number,
    sort?: string
  ): Observable<PaginationModel<ProductModel>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    // Assign params if existences
    if (search) {
      params = params.set('search', search);
    }
    if (goldTypeId) {
      params = params.set('goldTypeId', goldTypeId.toString());
    }
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (subcategoryId) {
      params = params.set('subcategoryId', subcategoryId.toString());
    }
    if (sort) {
      params = params.set('sort', sort);
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
}
