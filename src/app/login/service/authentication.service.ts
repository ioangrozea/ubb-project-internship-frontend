import {Injectable} from "@angular/core";
import {LocalStorageData} from "../http";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private authDataKey = 'authenticationData';

  setAuthenticationData(data: LocalStorageData) {
    localStorage.setItem(this.authDataKey, JSON.stringify(data));
  }

  getAuthenticationData(): LocalStorageData {
    return JSON.parse(localStorage.getItem(this.authDataKey));
  }

  removeAuthenticationData() {
    localStorage.removeItem(this.authDataKey);
  }
}
