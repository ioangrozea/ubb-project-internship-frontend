import {Component, OnInit} from '@angular/core';
import {AuthenticationApiService, AuthenticationData, LocalStorageData} from "../../http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../model/login-request";
import {AuthenticationService} from "../../service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string = "profile"
  loginRequest: LoginRequest;
  hide = true;
  public logInForm = new FormGroup({
    username: new FormControl('',),
    password: new FormControl('', [Validators.required]),
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
      this.loginRequest.fromForm(request);
    });
  }

  onSubmit() {
    for (const control in this.logInForm.controls) {
      if (this.logInForm.controls.hasOwnProperty(control)) {
        this.logInForm.controls[control].markAsUntouched();
        this.logInForm.controls[control].setErrors({});
      }
    }

    this.authenticationApiService.login(this.loginRequest).subscribe({
      next: (authData: AuthenticationData) => {
        let localStorageData = new LocalStorageData(authData.token, authData.id);
        this.authenticationService.setAuthenticationData(localStorageData).then(() =>
          this.router.navigate([this.returnUrl]));
      }
    });
  }

  register() {
    this.router.navigate(['/profile/register']);
  }
}
