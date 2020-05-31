import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../login/service";
import {UserProfile} from "../../model/user-profile";
import {ProfileApiService} from "../../http";
import {Observable} from "rxjs";
import {UserPreference} from "../../model/user-preference";
import {UserOption} from "../../model/user-option";
import {map} from "rxjs/operators";
import {UserFeature} from "../../model/user-feature";
import {Photo} from "../../../shared/components/carousel/model/photo";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile>;
  userPreferences$: Observable<UserOption[]>;
  userFeatures$: Observable<UserOption[]>;
  userPhotos$: Observable<Photo[]>

  constructor(private profileApiService: ProfileApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.profile$ = this.profileApiService.getProfile(this.authenticationService.getAuthenticationData().accountId)
    this.userPreferences$ = this.profileApiService.getPreferences(this.authenticationService.getAuthenticationData().profileId)
      .pipe(
        map((userPreferences: UserPreference[]) => userPreferences.map<UserOption>(preference => ({
          text: preference.PreferenceText,
          id: preference.PreferenceId,
          profileId: preference.ProfileId
        })))
      );
    this.userFeatures$ = this.profileApiService.getFeatures(this.authenticationService.getAuthenticationData().profileId)
      .pipe(
        map((userPreferences: UserFeature[]) => userPreferences.map<UserOption>(preference => ({
          text: preference.FeatureText,
          id: preference.FeatureId,
          profileId: preference.ProfileId
        })))
      );
    this.userPhotos$ =  this.profileApiService.getProfilePhotos(this.authenticationService.getAuthenticationData().profileId)
  }

  preferencesToDelete(event: UserOption[]) {
    event.forEach(userOption => this.profileApiService.deletePreference(userOption.id))
  }

  preferencesToAdd(event: UserOption[]) {
    event.map(userOption => {
      return {
        profile_id: userOption.profileId,
        text: userOption.text
      }
    }).forEach(obj => this.profileApiService.addPreference(obj))
  }

  featuresToDelete(event: UserOption[]) {
    event.forEach(userOption => this.profileApiService.deleteFeature(userOption.id))
  }

  featuresToAdd(event: UserOption[]) {
    event.map(userOption => {
      return {
        profile_id: userOption.profileId,
        text: userOption.text
      }
    }).forEach(obj => this.profileApiService.addFeature(obj))
  }
}
