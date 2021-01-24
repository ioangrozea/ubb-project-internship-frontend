import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {NotificationService} from '../../shared/service/NotificationService';

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
              private router: Router,
              private notificationService: NotificationService) {
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${environment.apiUrl}/login`, loginRequest, {observe: 'response'}).subscribe(res => {
      console.log(res.headers);
      const authorizationHeader = res.headers.get('Authorization');
      console.log(authorizationHeader);
      const userId = this.getDecodedAccessToken(authorizationHeader.split(' ')[1]).userId;
      this.authenticationService.setAuthenticationData(
        new AuthData(authorizationHeader, loginRequest.username, loginRequest.userType.toString(), userId));
      if (loginRequest.userType.toString() === 'ROLE_STUDENT') {
        this.router.navigate(['positions/student']);
      } else if (loginRequest.userType.toString() === 'ROLE_COMPANY'){
        this.router.navigate(['positions/company']);
      } else if (loginRequest.userType.toString() === 'ROLE_ADMIN'){
        this.router.navigate(['positions/admin']);
      }},
      (error) => {
        this.notificationService.createToastrError('Wrong username or password', 'ERROR');
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
