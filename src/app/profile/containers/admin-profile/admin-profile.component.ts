import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../validator/password-match.validator';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {ProfileApiService} from '../../http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../../shared/service/NotificationService';
import {Admin} from '../../model/admin';


@Component({
  selector: 'app-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: Admin;
  initialUsername: string;
  minPw = 7;
  adminFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  passwordFormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(this.minPw)]),
    password2: new FormControl('', [Validators.required]),
  }, {validators: passwordMatchValidator});

  dialogData = new ConfirmDialogModel('Confirm Action', 'Delete your profile?');

  constructor(private profileApiService: ProfileApiService, private dialog: MatDialog, private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.admin = new Admin();
    this.adminFormGroup.valueChanges.subscribe((request) => {
      this.admin.username = request.username;
    });
    this.profileApiService.getAdminById(+localStorage.getItem('userId')).subscribe(
      result => {
        this.adminFormGroup.controls.username.setValue(result.username);
        this.initialUsername = this.admin.username;
        this.notificationService.createToastrSuccess('Profile details successfully loaded', 'SUCCESS');
      },
      error => console.log(JSON.stringify(error)));
  }

  /* Shorthands for form controls (used from within template) */
  get password() {
    return this.passwordFormGroup.get('password');
  }

  get password2() {
    return this.passwordFormGroup.get('password2');
  }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.passwordFormGroup.hasError('passwordMismatch')) {
      this.password2.setErrors([{passwordMismatch: true}]);
    } else {
      this.password2.setErrors(null);
    }
  }

  update() {
    this.admin.password = null;
    let usernameChanged = false;
    if (this.initialUsername !== this.admin.username) {
      usernameChanged = true;
    }
    this.profileApiService.updateAdmin(+localStorage.getItem('userId'), this.admin).subscribe(
      result => {
        this.adminFormGroup.controls.username.setValue(result.username);
        this.notificationService.createToastrSuccess('Admin details successfully updated', 'SUCCESS');
        if (usernameChanged) {
          console.log('username changed');
          localStorage.removeItem('token');
          localStorage.removeItem('accountType');
          localStorage.removeItem('userId');
          this.notificationService.createToastrSuccess('New log in is required', 'INFO');
          this.router.navigate(['/login']);
        }
      },
      error => console.log(JSON.stringify(error)));
  }

  updatePassword() {
    const admin2 = new Admin();
    admin2.password = this.passwordFormGroup.controls.password.value;
    this.profileApiService.updateAdmin(+localStorage.getItem('userId'), admin2).subscribe(
      result => {
        console.log('password updated');
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        localStorage.removeItem('userId');
        this.notificationService.createToastrSuccess('Password successfully updated. Please log in again.', 'SUCCESS');
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
        this.profileApiService.deleteCompany(+localStorage.getItem('userId')).subscribe(
          result => {
            console.log('user deleted');
            localStorage.removeItem('token');
            localStorage.removeItem('accountType');
            localStorage.removeItem('userId');
            this.notificationService.createToastrSuccess('Profile successfully deleted', 'SUCCESS');
            this.router.navigate(['/login']);
          },
          error => console.log(JSON.stringify(error)));
      }
    });
  }
}
