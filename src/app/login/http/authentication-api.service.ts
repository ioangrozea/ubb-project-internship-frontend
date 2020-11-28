import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../model/login-request';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../service';
import {Router} from '@angular/router';

export class LocalStorageData {
  public token: string;
  public accountType: string;

  constructor(token: string, accountType: string) {
    this.token = token;
    this.accountType = accountType;
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
    return this.http.post(`${environment.apiUrl}/login`, loginRequest).subscribe();
  }

  logout() {
    this.authenticationService.removeAuthenticationData();
    this.authenticationDataSubject.next(null);
    this.router.navigate(['login']);
  }
}
