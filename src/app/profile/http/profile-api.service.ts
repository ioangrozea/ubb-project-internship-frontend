import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserProfile} from "../model/user-profile";
import {Observable} from "rxjs";
import {UserPreference} from "../model/user-preference";
import {UserFeature} from "../model/user-feature";
import {Photo} from "../../shared/components/carousel/model/photo";


@Injectable({providedIn: 'root'})
export class ProfileApiService {

  constructor(private http: HttpClient) {
  }

  getProfile(user_id: number): Observable<UserProfile> {
    const options = {
      params: new HttpParams().set('user_id', user_id.toString())
    };
    return this.http.get<UserProfile>(`${environment.api_profile_url}/profile/get-by-user`, options);
  }

  getPreferences(user_id: number): Observable<UserPreference[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<UserPreference[]>(`${environment.api_profile_url}/profile/preference/get-by-profile`, options);
  }

  addPreference(preference) {
    return this.http.post(`${environment.api_profile_url}/profile/preference/insert`, preference)
  }

  deletePreference(id: number) {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.delete(`${environment.api_profile_url}/profile/preference/delete`, options)
  }

  getFeatures(user_id: number): Observable<UserFeature[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<UserFeature[]>(`${environment.api_profile_url}/profile/feature/get-by-profile`, options);
  }

  addFeature(feature) {
    return this.http.post(`${environment.api_profile_url}/profile/feature/insert`, feature)
  }

  deleteFeature(id: number) {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.delete(`${environment.api_profile_url}/profile/feature/delete`, options)
  }

  getProfilePhotos(user_id: number): Observable<Photo[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<Photo[]>(`${environment.api_profile_url}/profile/photo/get-by-profile`, options)
  }
}
