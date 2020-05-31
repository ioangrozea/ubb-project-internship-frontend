import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Photo} from "../../shared/components/carousel/model/photo";
import {MatchApiService} from "../http";
import {ProfileApiService} from "../../profile/http";
import {AuthenticationApiService} from "../../login/http";
import {RecommendedProfile} from "../model/recommended-profile";
import {Like} from "../model/like";

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
              public authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit(): void {
    this.getMatch()
  }

  getMatch() {
    this.matchApiService.getRecommendation(this.authenticationApiService.authenticationDataValue.accountId)
      .subscribe((recommendedProfile: RecommendedProfile) => {
        if (recommendedProfile) {
          this.recommendedProfile = recommendedProfile;
          return this.photos$ = this.profileApiService.getProfilePhotos(recommendedProfile.ProfileId);
        }
      })
  }

  like() {
    this.matchApiService.likeProfile(new Like(this.authenticationApiService.authenticationDataValue.accountId, this.recommendedProfile.ProfileId, true));

  }

  dislike() {
    this.matchApiService.likeProfile(new Like(this.authenticationApiService.authenticationDataValue.accountId, this.recommendedProfile.ProfileId, false));
  }
}
