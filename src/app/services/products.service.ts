import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
    .pipe(map(data => data.map(data => new Product().deserialize(data))));
  }

  addProduct(product: Product) : any {
    return this.http.post<any>(environment.apiUrl + "/addproduct", {"product": product});
  }

  updateProduct(product: Product): any {
    return this.http.put<any>(environment.apiUrl + "/updateproduct", {"product": product});
  }

  deleteProduct(productnumber) {
    return this.http
    .delete(`${environment.apiUrl}/deleteproduct?productnumber=${productnumber}`);
  }
}
