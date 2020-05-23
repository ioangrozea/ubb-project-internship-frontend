import {Component, OnInit} from '@angular/core';
import {Photo} from "./model/photo";
import {CarouselApiService} from "./http";
import {AuthenticationService} from "../../../login/service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit {
  images: Photo[];


  constructor(private carouselApiService: CarouselApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.carouselApiService.getProfilePhotos(this.authenticationService.getAuthenticationData().id).subscribe(images => {
      if (images)
        this.images = images
    })
  }

}
