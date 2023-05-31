import { Injectable } from '@angular/core';
import {OrderRequest} from "../models/request/OrderRequest";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const CLIENT_ORDERS_API = "http://localhost:8080/api/v1/client/orders"

@Injectable({
  providedIn: 'root'
})
export class ClientOrdersService {

  constructor(private http: HttpClient) { }

  public createOrder(order: OrderRequest): Observable<any> {
    return this.http.post(CLIENT_ORDERS_API, {
      id: 0,
      name: order.name,
      weight: order.weight,
      height: order.height,
      width: order.width,
      type: order.type,
      deliveryPrice: order.deliveryPrice,
      deliverDueTime: order.deliverDueTime,
      locationToId: order.locationToId,
      locationFromId: order.locationFromId
    });
  }

  public getOrders(): Observable<any> {
    return this.http.get(CLIENT_ORDERS_API);
  }

  public getOrder(id: number): Observable<any> {
    return this.http.get(CLIENT_ORDERS_API + "/" + id);
  }

  public putOrder(order: OrderRequest): Observable<any> {
    return this.http.put(CLIENT_ORDERS_API + "/put", {
      id: order.id,
      name: order.name,
      weight: order.weight,
      height: order.height,
      width: order.width,
      type: order.type,
      deliveryPrice: order.deliveryPrice,
      deliverDueTime: order.deliverDueTime,
      locationToId: order.locationToId,
      locationFromId: order.locationFromId
    });
  }

  public deleteOrder(id: number): Observable<any> {
    return this.http.delete(CLIENT_ORDERS_API + "/delete/" + id);
  }

  public getOrderDriver(id: number): Observable<any> {
    return this.http.get(CLIENT_ORDERS_API + "/" + id + "/driver");
  }
}
