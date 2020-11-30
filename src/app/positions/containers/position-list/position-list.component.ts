import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {
  // pt noob aici pui orice componenta care are url
  positionList: Array<Position>;

  constructor(private positionService: PositionService, private router: Router) {
  }

  ngOnInit() {
    // service call
    this.positionList = Array<Position>();
    console.log('calling service');
    this.positionService.getPositionList().subscribe(
      result => {
        console.log('nr received positions:' + result.length);
        this.positionList = this.positionList.concat(result);
        console.log('nr mapped positions: ' + this.positionList.length);
        this.positionList.forEach(pos => {
          console.log('received position date' + pos.createdAt);
        });
      },
      error => console.log(JSON.stringify(error)));
    console.log('service called');
  }

}
