import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';
import {NotificationService} from '../../../shared/service/NotificationService';

@Component({
  selector: 'app-student-positions',
  templateUrl: './student-positions.component.html',
  styleUrls: ['./student-positions.component.css']
})
export class StudentPositionsComponent implements OnInit {
  positionList: Array<Position>;

  constructor(private positionService: PositionService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    // service call
    this.positionList = Array<Position>();
    this.positionService.getAllPositionList().subscribe(
      result => {
        this.positionList = this.positionList.concat(result);
      },
      error => console.log(JSON.stringify(error)));
  }
}
