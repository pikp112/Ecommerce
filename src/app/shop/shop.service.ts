import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Pagination';
import { ICategory } from '../shared/Category';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/shopparams';
import { IProduct } from '../shared/Product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:44332/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.categoryid) {
      params = params.append('categoryid', shopParams.categoryid.toString());
    }
    if (shopParams.search) {
      params = params.append('Search', shopParams.search);
    }
    params = params.append('Sorting', shopParams.sorting);
    params = params.append('pageNumber', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    return this.http
      .get<IPagination>(this.baseUrl + 'Product/get-all-products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      ); // in this way we can get the response body
  }
  getCategories() {
    return this.http.get<ICategory[]>(
      this.baseUrl + 'Product/get-all-category'
    );
  }
  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'Product/get-product-by-id/' + id);
  }
}
