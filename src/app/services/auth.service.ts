import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../models/response/UserResponse";
import {LoginRequest} from "../models/request/LoginRequest";
import {RegisterRequest} from "../models/request/RegisterRequest";

const AUTH_API = "http://localhost:8080/api/v1/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      login: loginRequest.login,
      password: loginRequest.password
    });
  }

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(AUTH_API + '/register', {
      email: registerRequest.email,
      name: registerRequest.name,
      password: registerRequest.password,
      phoneNumber: registerRequest.phoneNumber,
      role: registerRequest.role
    });
  }
}
