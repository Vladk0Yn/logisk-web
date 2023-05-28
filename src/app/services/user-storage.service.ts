import { Injectable } from '@angular/core';
import {UserResponse} from "../models/response/UserResponse";

const USER_KEY = 'user';
const TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveUser(user: UserResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  public getToken(): string {
      return <string>window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): UserResponse {
    return <UserResponse>JSON.parse(window.sessionStorage.getItem(USER_KEY))
  }

  public logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
