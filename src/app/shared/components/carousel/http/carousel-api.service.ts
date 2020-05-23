import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "../model/photo";
import {environment} from "../../../../../environments/environment";


@Injectable({providedIn: 'root'})
export class CarouselApiService {

  constructor(private http: HttpClient) {
  }

  getProfilePhotos(user_id: number): Observable<Photo[]> {
    const options = {
      params: new HttpParams().set('profile_id', user_id.toString())
    };
    return this.http.get<Photo[]>(`${environment.api_profile_url}/profile/photo/get-by-profile`, options)
  }
}
