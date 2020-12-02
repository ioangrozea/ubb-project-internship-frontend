import {Injectable} from '@angular/core';
import {PositionApiService} from '../http';
import {Position} from '../model/position';
import {Observable} from 'rxjs';
import {PositionDetails} from '../model/position-details';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private positionApiService: PositionApiService) {
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
    return null;
  }
}
