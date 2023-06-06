import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const DRIVER_API = "http://localhost:8080/api/v1/driver";

@Injectable({
  providedIn: 'root'
})
export class DriverAccountService {

  constructor(private http: HttpClient) { }

  getBalance(): Observable<any> {
    return this.http.get(DRIVER_API + "/balance");
  }

  withdraw(amount: number): Observable<any> {
    return this.http.put(DRIVER_API + "/balance/withdraw?amount=" + amount, {});
  }
}
