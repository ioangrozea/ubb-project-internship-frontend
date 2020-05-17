import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "../model/login-request";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../service";

export class AuthenticationData {
  public token: string;
  public id: number;
}


@Injectable({providedIn: 'root'})
export class AuthenticationApiService {
  private authenticationDataSubject: BehaviorSubject<AuthenticationData>;
  public authenticationData: Observable<AuthenticationData>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.authenticationDataSubject = new BehaviorSubject<AuthenticationData>(
      JSON.parse(this.authenticationService.getAuthenticationData()));
    this.authenticationData = this.authenticationDataSubject.asObservable();
  }

  get authenticationDataValue(): AuthenticationData {
    return this.authenticationDataSubject.value;
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${environment.api_login_url}/account/login`, loginRequest)
      .pipe(
        map((auth: AuthenticationData) => {
          if (auth && auth.token) {
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
