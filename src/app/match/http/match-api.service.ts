import {HttpClient} from "@angular/common/http";

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Match} from "../model/match";
import {RecommendedProfile} from "../model/recommended-profile";
import {Like} from "../model/like";


@Injectable({providedIn: 'root'})
export class MatchApiService {

  constructor(private http: HttpClient) {
  }

  getMatches(user_id: number): Observable<Match[]> {
    return this.http.post<Match[]>(`${environment.api_match_url}/match/get-matches-by-profile-id`, {current_profile_id: user_id})
  }

  getRecommendation(user_id: number): Observable<RecommendedProfile> {
    return this.http.post<RecommendedProfile>(`${environment.api_match_url}/match/get-recommendation`, {current_profile_id: user_id})
  }

  likeProfile(like: Like){
    return this.http.post(`${environment.api_match_url}/match/get-recommendation`, like).subscribe();
  }
}
