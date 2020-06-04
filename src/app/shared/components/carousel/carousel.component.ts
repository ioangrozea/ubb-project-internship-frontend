import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Photo} from "./model/photo";
import {Observable} from "rxjs";
import {NgbSlideEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() images$: Observable<Photo[]>;
  images: Photo[];
  index = 0;
  @Output("currentImage") currentImage = new EventEmitter<Photo>();

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
          this.currentImage.emit(this.images[0]);
        }
      })
    }
  }

  imageSlide($event: NgbSlideEvent) {
    const number = parseInt($event.current.replace("slideId_", ""), 10);
    this.currentImage.emit(this.images[number]);
  }
}
