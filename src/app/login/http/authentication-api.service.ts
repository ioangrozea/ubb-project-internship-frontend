import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';

export class AuthData {
  public token: string;
  public userName: string;
  public accountType: string;

  constructor(token: string, userName: string, accountType: string) {
    this.token = token;
    this.userName = userName;
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
        new AuthData(res.headers.get("authorization"), loginRequest.username, loginRequest.userType.toString()));
      this.router.navigate(['positions']);
    });
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.router.navigate(['login']);
  }
}
