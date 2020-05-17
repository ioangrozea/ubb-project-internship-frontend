import {Injectable} from "@angular/core";
import {AuthenticationData} from "../http";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private authDataKey = 'authenticationData';

  setAuthenticationData(data) {
    localStorage.setItem(this.authDataKey, JSON.stringify(data));
  }

  getAuthenticationData(): AuthenticationData {
    return JSON.parse(localStorage.getItem(this.authDataKey));
  }

  removeAuthenticationData() {
    localStorage.removeItem(this.authDataKey);
  }
}
