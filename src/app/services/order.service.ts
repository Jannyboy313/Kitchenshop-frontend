import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  addOrders(orders: Order[]) : any {
    return this.http.post<any>(environment.apiUrl + "/addorders", orders);
  }
}