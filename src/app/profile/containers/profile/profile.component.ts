import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../login/service";
import {UserProfile} from "../../model/user-profile";
import {ProfileApiService} from "../../http";
import {Observable} from "rxjs";
import {UserPreference} from "../../model/user-preference";
import {UserOption} from "../../model/user-option";
import {map} from "rxjs/operators";
import {UserFeature} from "../../model/user-feature";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile>;
  userPreferences$: Observable<UserOption[]>;
  userFeatures$: Observable<UserOption[]>;

  constructor(private profileApiService: ProfileApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.profile$ = this.profileApiService.getProfile(this.authenticationService.getAuthenticationData().id)
    this.userPreferences$ = this.profileApiService.getPreferences(this.authenticationService.getAuthenticationData().id)
      .pipe(
        map((userPreferences:UserPreference[]) =>  userPreferences.map<UserOption>(preference => ({
          text: preference.PreferenceText,
          id: preference.PreferenceId,
          profileId: preference.ProfileId
        })))
      );
    this.userFeatures$ = this.profileApiService.getFeatures(this.authenticationService.getAuthenticationData().id)
      .pipe(
        map((userPreferences:UserFeature[]) =>  userPreferences.map<UserOption>(preference => ({
          text: preference.FeatureText,
          id: preference.FeatureId,
          profileId: preference.ProfileId
        })))
      );
  }
}
