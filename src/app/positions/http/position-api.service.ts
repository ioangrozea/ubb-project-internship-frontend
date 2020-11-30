import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PositionDetails} from '../model/position-details';
import {Position} from '../model/position';

@Injectable({providedIn: 'root'})
export class PositionApiService {

  constructor(private http: HttpClient) {
  }

  getPositionDetailsById(positionId: number): Observable<PositionDetails> {
    return this.http.get<PositionDetails>(`${environment.apiUrl}/position/${positionId}`);
  }

  getPositions(): Observable<Array<Position>> {
    return this.http.get<Array<Position>>(`${environment.apiUrl}/position`);
  }


}
