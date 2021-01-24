import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Company} from '../model/company';
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class CompaniesService {

  constructor(private http: HttpClient) {
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company`);
  }

  acceptCompany(id: number): Observable<Company> {
    return this.http.patch<Company>(`${environment.apiUrl}/company/accept/${id}`, null);
  }
}
