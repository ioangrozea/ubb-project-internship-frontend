import {Component, OnInit} from '@angular/core';
import {AuthenticationApiService} from '../../http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequest, UserType} from '../../model/login-request';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  userType = 'admin';
  hide = true;

  public logInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('ROLE_ADMIN'),
  });

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit(): void {
    this.loginRequest.userType = UserType.ROLE_ADMIN;
    this.logInForm.valueChanges.subscribe((request) => {
      this.loginRequest = new LoginRequest();
      this.loginRequest.username = request.username;
      this.loginRequest.password = request.password;
      this.loginRequest.userType = request.userType;
    });
  }

  onSubmit() {
    this.authenticationApiService.login(this.loginRequest);
    this.logInForm.reset();
  }
}
