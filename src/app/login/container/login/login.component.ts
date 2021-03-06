import {Component, OnInit} from '@angular/core';
import {AuthenticationApiService} from '../../http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequest, UserType} from '../../model/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  userType = 'student';
  hide = true;

  public logInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('ROLE_STUDENT'),
  });

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit(): void {
    this.loginRequest.userType = UserType.ROLE_STUDENT;
    this.logInForm.valueChanges.subscribe((request) => {
      this.loginRequest = new LoginRequest();
      this.loginRequest.username = request.username;
      this.loginRequest.password = request.password;
      this.loginRequest.userType = request.userType;
      if (request.userType === UserType[UserType.ROLE_STUDENT]) {
        this.userType = 'student';
      } else {
        this.userType = 'company';
      }
    });
  }

  onSubmit() {
    this.authenticationApiService.login(this.loginRequest);
    this.logInForm.reset();
  }

  register() {
    switch (this.loginRequest.userType.toString()) {
      case 'ROLE_STUDENT': {
        this.router.navigate(['/register/student']);
        break;
      }
      case 'ROLE_COMPANY': {
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
