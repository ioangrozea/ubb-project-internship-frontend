import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../login/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationApiService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt accessToken if available
    const token = this.authenticationApiService.getAuthToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: token
        }
      });
    }
    return next.handle(request);
  }
}
