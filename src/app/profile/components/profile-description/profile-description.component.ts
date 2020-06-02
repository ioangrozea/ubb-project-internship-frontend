import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserProfile} from "../../model/user-profile";
import {Photo} from "../../../shared/components/carousel/model/photo";

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {
  @Input() userProfile$: Observable<UserProfile>;
  @Input() photos$: Observable<Photo[]>;
  userProfile: UserProfile;
  photo: Photo;

  constructor() {
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => {
      if (userProfile)
        this.userProfile = userProfile
    })
    this.photos$.subscribe(photos => {
      if (photos && photos[0])
        this.photo = photos[0];
    })
  }
}
