import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../login/service';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../shared/service/NotificationService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationApiService: AuthenticationService, private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
