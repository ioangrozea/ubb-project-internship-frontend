import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProfileService} from "../service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {UserProfile} from "../model/user-profile";
import {Observable} from "rxjs";
import {UserPreference} from "../model/user-preference";
import {UserFeature} from "../model/user-feature";


@Injectable({providedIn: 'root'})
export class ProfileApiService {

  constructor(private http: HttpClient,
              private authenticationService: ProfileService) {
  }

  getProfile(user_id: number): Observable<UserProfile> {
    const options = {
      params: new HttpParams().set('user_id', user_id.toString())
    };
    return this.http.get(`${environment.api_profile_url}/profile/get-by-user`, options)
      .pipe(
        map((userProfile: UserProfile) =>  userProfile)
      );
  }

  getPreferences(user_id: number): Observable<UserPreference[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<UserPreference[]>(`${environment.api_profile_url}/profile/preference/get-by-profile`, options);
  }

  getFeatures(user_id: number): Observable<UserFeature[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<UserFeature[]>(`${environment.api_profile_url}/profile/feature/get-by-profile`, options);
  }
}
