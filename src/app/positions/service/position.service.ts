import {Injectable} from '@angular/core';
import {PositionApiService} from '../http';
import {Position} from '../model/position';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private positionApiService: PositionApiService) {
  }

  getPositionList(): Observable<Array<Position>> {
    return this.positionApiService.getPositions();
  }

}
