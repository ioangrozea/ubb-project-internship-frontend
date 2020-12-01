import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CompanyRegister, StudentRegister} from '../model/register';
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class RegisterApiService {

  constructor(private http: HttpClient) {
  }

  addStudent(student: StudentRegister): Observable<any> {
    return this.http.post(`${environment.apiUrl}/student/signup`, student);
  }

  addCompany(company: CompanyRegister): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/signup`, company);
  }
}
