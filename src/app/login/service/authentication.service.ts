import {Injectable} from "@angular/core";
import {LocalStorageData} from "../http";
import {ProfileApiService} from "../../profile/http";

@Injectable({providedIn: 'root'})
export class AuthenticationService {


  constructor(private profileApiService: ProfileApiService) {
  }

  private authDataKey = 'authenticationData';

  async setAuthenticationData(data: LocalStorageData) {
    let profile = await this.profileApiService.getProfile(data.accountId).toPromise();
    data.profileId = profile.ProfileId;
    localStorage.setItem(this.authDataKey, JSON.stringify(data));
  }

  getAuthenticationData(): LocalStorageData {
    return JSON.parse(localStorage.getItem(this.authDataKey));
  }

  removeAuthenticationData() {
    localStorage.removeItem(this.authDataKey);
  }
}
