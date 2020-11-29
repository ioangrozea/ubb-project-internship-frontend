import {Injectable} from '@angular/core';
import {AuthData} from '../http';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  constructor(private router: Router) {
  }

  setAuthenticationData(data: AuthData) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('accountType', data.accountType);
  }

  getAuthToken(): string {
    return localStorage.getItem('token');
  }

  getAccountType(): string {
    return localStorage.getItem('accountType');
  }

  removeAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('accountType');
  }

  logOut() {
    this.removeAuthenticationData();
    this.router.navigate(['/login']);
  }
}
