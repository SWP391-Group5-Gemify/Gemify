import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  constructor(httpClient: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getProducts(
    pageIndex: number,
    pageSize: number,
    search?: string,
    sort?: string
  ): Observable<ProductModel> {}
}
