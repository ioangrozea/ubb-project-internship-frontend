import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {ProfileApiService} from '../../http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{
  student: Student;
  isReadonly: boolean;
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private profileApiService: ProfileApiService) {
    this.isReadonly = true;
  }

  ngOnInit(): void {
    this.student = new Student();
    this.registerForm.valueChanges.subscribe((request) => {
      this.student.username = request.username;
      this.student.firstName = request.firstName;
      this.student.lastName = request.lastName;
      this.student.password = request.password;
    });
    this.profileApiService.getStudentById(+localStorage.getItem('userId')).subscribe(
      result => {
        this.registerForm.controls.firstName.setValue(result.firstName);
        this.registerForm.controls.lastName.setValue(result.lastName);
        this.registerForm.controls.username.setValue(result.username);
      },
      error => console.log(JSON.stringify(error)));
  }

  update() {
    console.log('calling service');3
    console.log('password1:' + this.student.password);
    if (this.registerForm.controls.password.value.length < 1) {
      this.student.password = null;
    }
    console.log('password2:' + this.student.password);
    this.profileApiService.updateStudent(+localStorage.getItem('userId'), this.student).subscribe(
      result => {
        this.registerForm.controls.firstName.setValue(result.firstName);
        this.registerForm.controls.lastName.setValue(result.lastName);
        this.registerForm.controls.username.setValue(result.username);
      },
      error => console.log(JSON.stringify(error)));
    console.log('service called');
  }

  edit() {
    this.isReadonly = !this.isReadonly;
  }

  delete() {
    this.profileApiService.deleteStudent(+localStorage.getItem('userId'));
  }
}
