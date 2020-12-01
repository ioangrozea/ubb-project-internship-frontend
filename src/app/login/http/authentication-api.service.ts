import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

export class AuthData {
  public token: string;
  public userName: string;
  public accountType: string;
  public userId: number;

  constructor(token: string, userName: string, accountType: string, userId: number) {
    this.token = token;
    this.userName = userName;
    this.accountType = accountType;
    this.userId = userId;
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
      const authorizationHeader = res.headers.get('authorization');
      const userId = this.getDecodedAccessToken(authorizationHeader.split(' ')[1]).userId;
      this.authenticationService.setAuthenticationData(
        new AuthData(authorizationHeader, loginRequest.username, loginRequest.userType.toString(), userId));
      this.router.navigate(['positions']);
    });
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.router.navigate(['login']);
  }

  private getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch (Error){
      return null;
    }
  }
}
