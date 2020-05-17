import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from "../../model/user-profile";

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
