import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../login/service";
import {UserProfile} from "../../model/user-profile";
import {ProfileApiService} from "../../http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile>;

  constructor(private profileApiService: ProfileApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.profile$ = this.profileApiService.getProfile(this.authenticationService.getAuthenticationData().id)
  }
}
