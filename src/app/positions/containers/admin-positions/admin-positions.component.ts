import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';
import {AuthenticationService} from '../../../login/service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../shared/service/NotificationService';

@Component({
  selector: 'app-admin-positions',
  templateUrl: './admin-positions.component.html',
  styleUrls: ['./admin-positions.component.css']
})
export class AdminPositionsComponent implements OnInit {
  positionList: Array<Position>;

  constructor(private positionService: PositionService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.positionList = Array<Position>();
    this.positionService.getAllPositionList().subscribe(
      result => {
        this.positionList = this.positionList.concat(result);
      },
      error => console.log(JSON.stringify(error)));
  }

  deleteComponent(position: Position) {
    const index: number = this.positionList.indexOf(position);
    if (index !== -1) {
      this.positionList.splice(index, 1);
    }
  }
}
