import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

const BASE_URL = environment.apiUrl;
console.log(BASE_URL);

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  sort = 'desc';
  pageSize: number = 12;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = this.pageSize, sort = this.sort, category?: string): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
    );
  }
  
  
  
  
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${BASE_URL}/categories`);
  }


}
