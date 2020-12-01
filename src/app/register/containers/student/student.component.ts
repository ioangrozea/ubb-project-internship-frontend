import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../login/service';
import {StudentRegister} from '../../model/register';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {RegisterApiService} from '../../http';

@Component({
  selector: 'app-student-register',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class StudentComponent implements OnInit {
  studentRegister: StudentRegister = new StudentRegister();
  hide = true;

  public registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthdate: new FormControl('', [Validators.required]),
    username: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private registerApiService: RegisterApiService) {
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((request) => {
      this.studentRegister.username = request.username;
      this.studentRegister.password = request.password;
      this.studentRegister.birthdate = this.datePipe.transform(request.birthdate, "yyyy-MM-dd");
      this.studentRegister.firstName = request.firstName;
      this.studentRegister.lastName = request.lastName;
      this.studentRegister.description = request.description;
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
    this.registerApiService.addStudent(this.studentRegister).subscribe(() => this.router.navigate(['login']));
  }
}
