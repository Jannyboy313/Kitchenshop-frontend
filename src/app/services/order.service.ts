import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  addOrders(orders: Order[]) : any {
    return this.http.post<any>(environment.apiUrl + "/addorders", orders);
  }

  getCustomerOrders() {
    return this.http
    .get<any>(`${environment.apiUrl}/customerorders`).pipe(
    map(data => data.map(data => new Order().deserialize(data), new Product().deserialize(data))));
  }
}