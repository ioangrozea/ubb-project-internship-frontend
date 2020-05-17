import {Component, OnInit} from '@angular/core';
import {AuthenticationApiService} from "../../http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../model/login-request";

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
    usernameOrEmail: new FormControl('',),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
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
      next: () => this.router.navigate([this.returnUrl])
    });
  }
}
