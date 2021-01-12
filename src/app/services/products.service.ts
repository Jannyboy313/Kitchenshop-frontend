import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from "../../environments/environment";
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
    .pipe(map(data => data.map(data => new Product().deserialize(data))));
  }

  addProduct(product: Product, image: Image) : any {
    return this.http.post<any>(environment.apiUrl + "/addproduct", {"product": product, "image": image});
  }
}
