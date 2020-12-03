import {Component, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';
import {AuthenticationService} from '../../../login/service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-positions',
  templateUrl: './company-positions.component.html',
  styleUrls: ['./company-positions.component.css']
})
export class CompanyPositionsComponent implements OnInit {
  positionList: Array<Position>;

  constructor(private positionService: PositionService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.positionList = Array<Position>();
    this.positionService.getCompanyPositionList(this.authenticationService.getAccountId()).subscribe(
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

  add() {
    this.router.navigate(['positions/add']);
  }
}
