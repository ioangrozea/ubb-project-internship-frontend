import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Student} from '../model/student';
import {Company} from '../model/company';


@Injectable({providedIn: 'root'})
export class ProfileApiService {

  constructor(private http: HttpClient) {
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUrl}/student/${studentId}`);
  }

  updateStudent(studentId: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${environment.apiUrl}/student/${studentId}`, student);
  }

  deleteStudent(studentId: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/student/${studentId}`);
  }

  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${environment.apiUrl}/company/${companyId}`);
  }

  updateCompany(companyId: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.apiUrl}/company/${companyId}`, company);
  }

  deleteCompany(companyId: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/company/${companyId}`);
  }
}
