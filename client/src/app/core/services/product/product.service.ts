import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
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
    const params: any = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
      search: search?.toString() ?? undefined,
      goldTypeId: goldTypeId?.toString() ?? undefined,
      categoryId: categoryId?.toString() ?? undefined,
      subcategoryId: subcategoryId?.toString() ?? undefined,
      sort: sort?.toString() ?? undefined,
    };

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
  updateProduct(product: ProductModel) {
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
  disableProduct(id: number) {
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
