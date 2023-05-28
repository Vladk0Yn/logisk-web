import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserStorageService} from "../services/user-storage.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.userService.getToken();
    if (token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
