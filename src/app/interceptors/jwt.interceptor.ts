import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationApiService} from "../login/http";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationApiService: AuthenticationApiService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt accessToken if available
    const authData = this.authenticationApiService.authenticationDataValue;
    if (authData && authData.token) {
      request = request.clone({
        setHeaders: {
          "authorization": authData.token
        }
      });
    }
    return next.handle(request);
  }
}
