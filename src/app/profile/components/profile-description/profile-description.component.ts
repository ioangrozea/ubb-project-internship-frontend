import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from "../../model/user-profile";
import {AuthenticationApiService} from "../../../login/http";
import {UserOption} from "../../model/user-option";

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {
  @Input() userProfile$: Observable<UserProfile>;
  userProfile: UserProfile;

  constructor() {
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => {
      if (userProfile)
        this.userProfile = userProfile
    })
  }
}
