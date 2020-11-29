import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';

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
    return this.http.post(`${environment.apiUrl}/login`, loginRequest, {observe: 'response'}).subscribe(res => {
      this.authenticationService.setAuthenticationData(
        new AuthData(res.headers.get("authorization").split(' ')[1], loginRequest.userType.toString()));
    });
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.router.navigate(['login']);
  }
}
