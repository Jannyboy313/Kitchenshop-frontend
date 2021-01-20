import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,  private authService: AuthService) {}

  addOrders(orders: Order[]) : any {
    return this.http.post<any>(environment.apiUrl + "/addorders", orders);
  }

  getCustomerOrders() {
    return this.http
    .get<Order[]>(`${environment.apiUrl}/customerorders`).pipe(
    map(data => data.map(data => new Order().deserialize(data))));
  }

  getAdminOrders() {
    return this.http
    .get<Order[]>(`${environment.apiUrl}/adminorders`).pipe(
    map(data => data.map(data => new Order().deserialize(data))));
  }

  deleteOrder(id) {
    return this.http
    .delete(`${environment.apiUrl}/deleteorder?orders_id=${id}`);
  }
}