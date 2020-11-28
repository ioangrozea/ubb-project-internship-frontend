import {Component, OnInit} from '@angular/core';
import {AuthenticationApiService} from '../../http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequest, UserType} from '../../model/login-request';
import {AuthenticationService} from '../../service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  hide = true;

  public logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('ROLE_STUDENT'),
  });

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService,
              private authenticationService: AuthenticationService) {
    if (authenticationApiService.authenticationDataValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.logInForm.valueChanges.subscribe((request) => {
      this.loginRequest = new LoginRequest();
      this.loginRequest.username = request.username;
      this.loginRequest.password = request.password;
      this.loginRequest.userType = request.userType;
    });
  }

  onSubmit() {
    for (const control in this.logInForm.controls) {
      if (this.logInForm.controls.hasOwnProperty(control)) {
        this.logInForm.controls[control].markAsUntouched();
        this.logInForm.controls[control].setErrors({});
      }
    }

    this.authenticationApiService.login(this.loginRequest);
  }

  register() {
    switch (this.loginRequest.userType) {
      case UserType.ROLE_STUDENT: {
        this.router.navigate(['/register/student']);
        break;
      }
      case UserType.ROLE_COMPANY: {
        this.router.navigate(['/register/company']);
        break;
      }
      default: {
        this.router.navigate(['/register/student']);
        break;
      }
    }
  }
}
