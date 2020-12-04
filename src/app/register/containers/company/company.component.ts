import {Component, OnInit} from '@angular/core';
import {CompanyRegister} from '../../model/register';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../login/service';
import {DatePipe} from '@angular/common';
import {RegisterApiService} from '../../http';
import {passwordMatchValidator} from '../../../profile/validator/password-match.validator';
import {NotificationService} from '../../../shared/service/NotificationService';

@Component({
  selector: 'app-company-register',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyRegister: CompanyRegister = new CompanyRegister();
  hide1 = true;
  hide2 = true;
  minPw = 7;

  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.minPw)]),
    password2: new FormControl('', [Validators.required]),
  }, {validators: passwordMatchValidator});

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private registerApiService: RegisterApiService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((request) => {
      this.companyRegister.username = request.username;
      this.companyRegister.password = request.password;
      this.companyRegister.name = request.name;
      this.companyRegister.description = request.description;
    });
  }

  /* Shorthands for form controls (used from within template) */
  get passwordConfirmation() { return this.registerForm.get('password'); }
  get passwordConfirmation2() { return this.registerForm.get('password2'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.passwordConfirmation2.setErrors([{passwordMismatch: true}]);
    } else {
      this.passwordConfirmation2.setErrors(null);
    }
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
    this.registerApiService.addCompany(this.companyRegister).subscribe(
      () => {
      this.notificationService.createToastrSuccess('Company was successfully registered.', 'SUCCESS');
      this.router.navigate(['login']);
    });
  }
}
