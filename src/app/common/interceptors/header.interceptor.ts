import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userInfo = this.authService.user;

    request = request.clone({
      headers: request.headers
        .append(
          'Authorization',
          'Bearer ' + userInfo?.accessToken
        )
        .append('Access-Control-Allow-Origin', '*'),
    });

    return next.handle(request);
  }
}