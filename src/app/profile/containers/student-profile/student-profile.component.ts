import {Component, OnInit} from '@angular/core';
import {Student} from '../../model/student';
import {ProfileApiService} from '../../http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../validator/password-match.validator';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{
  student: Student;
  initialFirstName: string;
  initialLastName: string;
  initialUsername: string;
  minPw = 7;
  studentFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });

  passwordFormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(this.minPw)]),
    password2: new FormControl('', [Validators.required]),
  }, {validators: passwordMatchValidator});

  dialogData = new ConfirmDialogModel('Confirm Action', 'Delete your ptofile?');

  constructor(private profileApiService: ProfileApiService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.student = new Student();
    this.studentFormGroup.valueChanges.subscribe((request) => {
      this.student.username = request.username;
      this.student.firstName = request.firstName;
      this.student.lastName = request.lastName;
    });
    this.profileApiService.getStudentById(+localStorage.getItem('userId')).subscribe(
      result => {
        this.studentFormGroup.controls.firstName.setValue(result.firstName);
        this.studentFormGroup.controls.lastName.setValue(result.lastName);
        this.studentFormGroup.controls.username.setValue(result.username);
        this.initialFirstName = this.student.firstName;
        this.initialLastName = this.student.lastName;
        this.initialUsername = this.student.username;
      },
      error => console.log(JSON.stringify(error)));
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.passwordFormGroup.get('password'); }
  get password2() { return this.passwordFormGroup.get('password2'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.passwordFormGroup.hasError('passwordMismatch')) {
      this.password2.setErrors([{passwordMismatch: true}]);
    } else {
      this.password2.setErrors(null);
    }
  }

  update() {
    this.student.password = null;
    let usernameChanged = false;
    if (this.initialUsername !== this.student.username) {
      usernameChanged = true;
    }
    this.profileApiService.updateStudent(+localStorage.getItem('userId'), this.student).subscribe(
      result => {
        this.studentFormGroup.controls.firstName.setValue(result.firstName);
        this.studentFormGroup.controls.lastName.setValue(result.lastName);
        this.studentFormGroup.controls.username.setValue(result.username);
        this.initialFirstName = this.student.firstName;
        this.initialLastName = this.student.lastName;
        if (usernameChanged) {
          console.log('username changed');
          localStorage.removeItem('token');
          localStorage.removeItem('accountType');
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
        }
      },
      error => console.log(JSON.stringify(error)));
  }

  updatePassword() {
    const student2 = new Student();
    student2.password = this.passwordFormGroup.controls.password.value;
    this.profileApiService.updateStudent(+localStorage.getItem('userId'), student2).subscribe(
      result => {
        console.log('password updated');
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
      },
      error => console.log(JSON.stringify(error)));
  }

  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('delete');
        this.profileApiService.deleteStudent(+localStorage.getItem('userId')).subscribe(
          result => {
            console.log('user deleted');
            localStorage.removeItem('token');
            localStorage.removeItem('accountType');
            localStorage.removeItem('userId');
            this.router.navigate(['/login']);
          },
          error => console.log(JSON.stringify(error)));;
      }
    });
  }
}

