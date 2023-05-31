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
}
