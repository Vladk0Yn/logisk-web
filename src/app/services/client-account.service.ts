import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const CLIENT_API = "http://localhost:8080/api/v1/client"

@Injectable({
  providedIn: 'root'
})
export class ClientAccountService {

  constructor(private http: HttpClient) { }

  getBalance(): Observable<any> {
    return this.http.get(CLIENT_API + "/balance");
  }

  topUpBalance(amount: number): Observable<any> {
    return this.http.put(CLIENT_API + "/balance?amount=" + amount, {});
  }
}
