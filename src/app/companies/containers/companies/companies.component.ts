import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../http';
import {NotificationService} from '../../../shared/service/NotificationService';
import {Company} from '../../model/company';
import {Position} from '../../../positions/model/position';

@Component({
  selector: 'app-company-register',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companyList: Array<Company>;

  constructor(private companiesService: CompaniesService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    // service call
    this.companyList = Array<Company>();
    this.companiesService.getAllCompanies().subscribe(
      result => {
        this.companyList = this.companyList.concat(result);
      },
      error => console.log(JSON.stringify(error)));
  }

  updatedComponent(company: Company) {
    this.companyList = Array<Company>();
    this.companiesService.getAllCompanies().subscribe(
      result => {
        this.companyList = this.companyList.concat(result);
      },
      error => console.log(JSON.stringify(error)));
  }
}
