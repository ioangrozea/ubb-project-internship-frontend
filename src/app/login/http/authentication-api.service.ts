import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "../model/login-request";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../service";

export class AuthenticationData {
  public accessToken: string;
  public id: number;
}


@Injectable({providedIn: 'root'})
export class AuthenticationApiService {
  private authenticationDataSubject: BehaviorSubject<AuthenticationData>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  get authenticationDataValue(): AuthenticationData {
    return this.authenticationDataSubject.value;
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${environment.api_login_url}/account/login`, loginRequest)
      .pipe(
        map((auth: AuthenticationData) => {
          if (auth && auth.accessToken) {
            this.authenticationService.setAuthenticationData(auth);
            this.authenticationDataSubject.next(auth);
          }
          return auth;
        }));
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.authenticationDataSubject.next(null);
  }
}
