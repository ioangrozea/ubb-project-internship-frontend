import {Injectable} from '@angular/core';
import {AuthData} from '../http';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  async setAuthenticationData(data: AuthData) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('accountType', data.accountType);
  }

  getAuthToken(): string {
   return  localStorage.getItem('token');
  }

  getAccountType(): string {
    return  localStorage.getItem('accountType');
  }

  removeAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('accountType');
  }
}
