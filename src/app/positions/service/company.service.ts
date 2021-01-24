import {Injectable} from '@angular/core';
import {CompanyApiService} from '../http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private companyApiService: CompanyApiService) {
  }

  isCompanyAccepted(id: number): Observable<boolean> {
    return this.companyApiService.isCompanyAccepted(id);
  }
}
