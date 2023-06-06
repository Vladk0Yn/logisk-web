import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TransportRequest} from "../models/request/TransportRequest";
import {Observable} from "rxjs";

const DRIVER_TRANSPORT_API = "http://localhost:8080/api/v1/driver/transport";

@Injectable({
  providedIn: 'root'
})
export class DriverTransportService {

  constructor(private http: HttpClient) { }

  createTransport(request: TransportRequest): Observable<any> {
    return this.http.post(DRIVER_TRANSPORT_API, {
      id: request.id,
      name: request.name,
      type: request.type,
      code: request.code,
      loadLength: request.loadLength,
      loadCapacity: request.loadCapacity,
      loadHeight: request.loadHeight,
      loadWidth: request.loadWidth
    });
  }

  updateTransport(request: TransportRequest): Observable<any> {
    return this.http.put(DRIVER_TRANSPORT_API, {
      id: request.id,
      name: request.name,
      type: request.type,
      code: request.code,
      loadCapacity: request.loadCapacity,
      loadLength: request.loadLength,
      loadHeight: request.loadHeight,
      loadWidth: request.loadWidth
    });
  }

  getTransport(): Observable<any> {
    return this.http.get(DRIVER_TRANSPORT_API);
  }
}
