import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../shared/service/NotificationService';
import {Company} from '../../model/company';
import {CompaniesService} from '../../http';
import {Position} from '../../../positions/model/position';

@Component({
  selector: 'app-portion',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  @Input()
  company: Company;
  @Output() updated: EventEmitter<Company> = new EventEmitter();
  companyStatus: string;

  constructor(private router: Router,
              private companiesService: CompaniesService,
              private notificationService: NotificationService) {
  }

  acceptCompany() {
    this.companiesService.acceptCompany(this.company.id).subscribe(
      result => {
        this.notificationService.createToastrSuccess('Company was successfully accepted', 'SUCCESS');
        this.updated.emit(result);
      },
      (error) => {
      this.notificationService.createToastrError('Company was not successfully accepted', 'ERROR');
    });
  }

  ngOnInit(): void {
    if (this.company.acceptedByAdmin) {
      this.companyStatus = 'accepted';
    } else {
      this.companyStatus = 'not accepted';
    }
  }
}
