import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

export class AuthData {
  public token: string;
  public accountType: string;

  constructor(token: string, accountType: string) {
    this.token = token;
    this.accountType = accountType;
  }
}


@Injectable({providedIn: 'root'})
export class AuthenticationApiService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${environment.apiUrl}/login`, loginRequest).pipe(
      map((data: AuthData) => {
        this.authenticationService.setAuthenticationData(data);
        // ToDo:Tiha redirect to correct module
        this.router.navigate(['login']);
      }),
    ).subscribe();
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.router.navigate(['login']);
  }
}
