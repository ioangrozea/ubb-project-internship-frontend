import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Photo} from "./model/photo";
import {Observable} from "rxjs";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() images$: Observable<Photo[]>;
  images: Photo[]

  ngOnInit(): void {
    this.images$.subscribe(images => {
      if (images)
        this.images = images
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("images$")) {
      this.images$.subscribe(images => {
        if (images) {
          this.images = images
        }
      })
    }
  }
}
