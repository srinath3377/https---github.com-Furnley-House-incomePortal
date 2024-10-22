import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!localStorage.getItem('auth_token')) {
      return next.handle(request);
    } else {
      let header = {
        headers: new HttpHeaders().set(
          'Auth',
          `Bearer ${localStorage.getItem('auth_token')}`,
        ),
      };
      const modifiedRequest = request.clone({ headers: header.headers });
      return next.handle(modifiedRequest);
    }
  }
}
