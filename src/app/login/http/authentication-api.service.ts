import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequest} from "../model/login-request";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../service";
import {Router} from "@angular/router";

export class AuthenticationData {
  public token: string;
  public id: number;

}

export class LocalStorageData {
  public token: string;
  public accountId: number;
  public profileId: number;


  constructor(token: string, accountId: number, profileId?: number) {
    this.token = token;
    this.accountId = accountId;
    this.profileId = profileId;
  }
}


@Injectable({providedIn: 'root'})
export class AuthenticationApiService {
  private authenticationDataSubject: BehaviorSubject<LocalStorageData>;
  public authenticationData: Observable<LocalStorageData>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationDataSubject = new BehaviorSubject<LocalStorageData>(
      this.authenticationService.getAuthenticationData());
    this.authenticationData = this.authenticationDataSubject.asObservable();
  }

  get authenticationDataValue(): LocalStorageData {
    return this.authenticationService.getAuthenticationData();
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${environment.api_login_url}/account/login`, loginRequest)
      .pipe(
        map((auth: AuthenticationData) => {
          if (auth && auth.token) {
            let localStorageData = new LocalStorageData(auth.token, auth.id);
            // this.authenticationService.setAuthenticationData(localStorageData);
            this.authenticationDataSubject.next(localStorageData);
          }
          return auth;
        }));
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.authenticationDataSubject.next(null);
    this.router.navigate(['login']);
  }
}
