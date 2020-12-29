import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  env = environment;
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http
    .get<Category[]>(`${this.env.apiUrl}/categories`).pipe(
    map(data => data.map(data => new Category().deserialize(data))));
  }

  public getProducts(): Observable<Product[]> {
    return this.http
    .get<Product[]>(`${this.env.apiUrl}/products`).pipe(
    map(data => data.map(data => new Product().deserialize(data))));
  }
}