import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const DRIVER_ORDER_API = "http://localhost:8080/api/v1/driver/orders";

@Injectable({
  providedIn: 'root'
})
export class DriverOrdersService {
  constructor(private http: HttpClient) { }

  getAvailableOrders(): Observable<any> {
    return this.http.get(DRIVER_ORDER_API + "/available");
  }

  takeOrder(id: number): Observable<any> {
    return this.http.put(DRIVER_ORDER_API + "/available/" + id + "/take", {});
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(DRIVER_ORDER_API + "/" + id);
  }

  getOrders(): Observable<any> {
    return this.http.get(DRIVER_ORDER_API);
  }

  getOrderClient(id: number): Observable<any> {
    return this.http.get(DRIVER_ORDER_API + "/" + id + "/client")
  }

  setOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(DRIVER_ORDER_API + "/" + id + "/status?status=" + status, {});
  }
}
