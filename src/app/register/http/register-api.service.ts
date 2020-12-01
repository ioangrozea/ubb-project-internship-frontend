import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CompanyRegister, StudentRegister} from '../model/register';
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class RegisterApiService {

  constructor(private http: HttpClient) {
  }

  addStudent(student: StudentRegister): Observable<any> {
    return this.http.post(`${environment.apiUrl}/student/signup`, student);
  }

  addCompany(company: CompanyRegister): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/signup`, company);
  }

  /*getProfile(account_id: number): Observable<UserProfile> {
    const options = {
      params: new HttpParams().set('user_id', account_id.toString())
    };
    return this.http.get<UserProfile>(`${environment.api_profile_url}/profile/get-by-user`, options);
  }

  getProfileById(profile_id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.api_profile_url}/profile/${profile_id}`);
  }

  getPreferences(profileId: number): Observable<UserPreference[]> {
    const options = {
      params: new HttpParams().set('profile_id', profileId.toString())
    };
    return this.http.get<UserPreference[]>(`${environment.api_profile_url}/profile/preference/get-by-profile`, options);
  }

  addPreference(preference) {
    return this.http.post(`${environment.api_profile_url}/profile/preference/insert`, preference).subscribe();
  }

  deletePreference(id: number) {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.delete(`${environment.api_profile_url}/profile/preference/delete`, options).subscribe();
  }

  getFeatures(profileId: number): Observable<UserFeature[]> {
    const options = {
      params: new HttpParams().set('profile_id', profileId.toString())
    };
    return this.http.get<UserFeature[]>(`${environment.api_profile_url}/profile/feature/get-by-profile`, options);
  }

  addFeature(feature) {
    return this.http.post(`${environment.api_profile_url}/profile/feature/insert`, feature).subscribe();
  }

  deleteFeature(id: number) {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.delete(`${environment.api_profile_url}/profile/feature/delete`, options).subscribe();
  }

  getProfilePhotos(profileId: number): Observable<Photo[]> {
    const options = {
      params: new HttpParams().set('profile_id', profileId.toString())
    };
    return this.http.get<Photo[]>(`${environment.api_profile_url}/profile/photo/get-by-profile`, options);
  }

  addImage(imageToAdd: string, profile: number) {
    return this.http.post(`${environment.api_profile_url}/profile/photo/insert`, {
      profile_id: profile,
      url: imageToAdd
    });
  }

  deleteImage(id: number) {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.delete(`${environment.api_profile_url}/profile/photo/delete`, options).subscribe();
  }

  registerAccount(registerAccount: AccountRegister) {
    return this.http.post(`${environment.api_login_url}/account/register`, registerAccount);
  }

  registerProfile(registerProfile: ProfileRegister) {
    return this.http.post(`${environment.api_profile_url}/profile/insert`, registerProfile);
  }
*/
}
