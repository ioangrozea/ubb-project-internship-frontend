import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const modified = request.clone({
      setHeaders: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      }
    });

    return next.handle(modified);
  }
}
