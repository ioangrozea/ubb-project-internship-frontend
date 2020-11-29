import {Component, OnInit} from '@angular/core';
import {CompanyRegister, StudentRegister} from '../../model/register';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationApiService} from '../../../login/http';
import {AuthenticationService} from '../../../login/service';
import {DatePipe} from '@angular/common';
import {RegisterApiService} from '../../http';

@Component({
  selector: 'app-company-register',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  companyRegister: CompanyRegister = new CompanyRegister();
  hide = true;

  public registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService,
              private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private registerApiService: RegisterApiService) {
    if (authenticationApiService.authenticationDataValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((request) => {
      this.companyRegister.username = request.username;
      this.companyRegister.password = request.password;
      this.companyRegister.name = request.name;
      this.companyRegister.description = request.description;
    });
  }

  onSubmit() {
    for (const control in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(control)) {
        this.registerForm.controls[control].markAsUntouched();
        this.registerForm.controls[control].setErrors({});
      }
    }
  }

  public register() {
    this.registerApiService.addCompany(this.companyRegister);
  }
}
