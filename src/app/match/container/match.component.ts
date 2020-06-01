import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Photo} from "../../shared/components/carousel/model/photo";
import {MatchApiService} from "../http";
import {ProfileApiService} from "../../profile/http";
import {AuthenticationApiService} from "../../login/http";
import {RecommendedProfile} from "../model/recommended-profile";
import {Like} from "../model/like";
import {AuthenticationService} from "../../login/service";

@Component({
  selector: 'app-preferences',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  photos$: Observable<Photo[]>;
  recommendedProfile: RecommendedProfile;

  constructor(public matchApiService: MatchApiService,
              public profileApiService: ProfileApiService,
              public authenticationApiService: AuthenticationApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getMatch()
  }

  getMatch() {
    this.matchApiService.getRecommendation(this.authenticationService.getAuthenticationData().profileId)
      .subscribe((recommendedProfile: RecommendedProfile) => {
        if (recommendedProfile) {
          this.recommendedProfile = recommendedProfile;
          return this.photos$ = this.profileApiService.getProfilePhotos(recommendedProfile.ProfileId);
        }
      })
  }

  like() {
    this.matchApiService.likeProfile(new Like(this.authenticationApiService.authenticationDataValue.profileId, this.recommendedProfile.ProfileId, true));
    this.getMatch();
  }

  dislike() {
    this.matchApiService.likeProfile(new Like(this.authenticationApiService.authenticationDataValue.profileId, this.recommendedProfile.ProfileId, false));
    this.getMatch();
  }
}
