import {Injectable} from '@angular/core';
import {PositionApiService} from '../http';
import {Position} from '../model/position';
import {Observable} from 'rxjs';
import {PositionDetails} from '../model/position-details';
import {AuthenticationService} from '../../login/service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private positionApiService: PositionApiService,
              private authenticationService: AuthenticationService) {
  }

  getPositionWithId(id: number): Observable<PositionDetails> {
    return this.positionApiService.getPositionDetailsById(id);
  }

  getStudentPositionList(): Observable<Array<Position>> {
    return this.positionApiService.getStudentPositions();
  }

  getCompanyPositionList(companyId: number): Observable<Array<Position>> {
    return this.positionApiService.getCompanyPositions(companyId);
  }

  deletePortion(positionId: number) {
    return this.positionApiService.deletePosition(positionId);
  }

  editPosition(position: Position) {
    return this.positionApiService.editPosition(position);
  }

  addPosition(position: Position) {
    position.companyId = this.authenticationService.getAccountId();
    return this.positionApiService.addPosition(position);
  }
}
