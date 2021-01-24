import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CompanyApiService {

  constructor(private http: HttpClient) {
  }

  isCompanyAccepted(positionId: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/company/accept/${positionId}`);
  }

}
