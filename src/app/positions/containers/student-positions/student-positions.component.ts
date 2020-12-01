import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';

@Component({
  selector: 'app-student-positions',
  templateUrl: './student-positions.component.html',
  styleUrls: ['./student-positions.component.css']
})
export class StudentPositionsComponent implements OnInit {
  positionList: Array<Position>;

  constructor(private positionService: PositionService) {
  }

  ngOnInit() {
    // service call
    this.positionList = Array<Position>();
    this.positionService.getStudentPositionList().subscribe(
      result => {
        this.positionList = this.positionList.concat(result);
      },
      error => console.log(JSON.stringify(error)));
  }
}
