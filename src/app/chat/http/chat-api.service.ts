import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../login/service";
import {Observable} from "rxjs";
import {RecommendedProfile} from "../../match/model/recommended-profile";
import {environment} from "../../../environments/environment";
import {Match} from "../../match/model/match";


@Injectable({providedIn: 'root'})
export class ChatApiService {
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  getChancels(profile_id: number): Observable<Match[]> {
    return this.http.post<Match[]>(`${environment.api_match_url}/match/get-matches-by-profile-id`, {current_profile_id: profile_id})
  }
}
