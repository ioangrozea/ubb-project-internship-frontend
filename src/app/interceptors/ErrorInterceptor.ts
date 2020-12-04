import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NotificationService} from '../shared/service/NotificationService';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../login/service';
import {catchError} from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationApiService: AuthenticationService, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationApiService.logOut();
        // location.reload(true);
      }

      const error = err.error.message || err.statusText;
      this.notificationService.createToastrError(error, 'ERROR');
      return throwError(error);
    }));
  }
}
