import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../validator/password-match.validator';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {ProfileApiService} from '../../http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Company} from '../../model/company';


@Component({
  selector: 'app-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit{
  company: Company;
  initialCompanyName: string;
  initialUsername: string;
  minPw = 7;
  companyFormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
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
    this.company = new Company();
    this.companyFormGroup.valueChanges.subscribe((request) => {
      this.company.username = request.username;
      this.company.name = request.companyName;
      this.company.description = request.description;
    });
    this.profileApiService.getCompanyById(+localStorage.getItem('userId')).subscribe(
      result => {
        this.companyFormGroup.controls.companyName.setValue(result.name);
        this.companyFormGroup.controls.description.setValue(result.description);
        this.companyFormGroup.controls.username.setValue(result.username);
        this.initialCompanyName = this.company.name;
        this.initialUsername = this.company.username;
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
    this.company.password = null;
    let usernameChanged = false;
    if (this.initialUsername !== this.company.username) {
      usernameChanged = true;
    }
    this.profileApiService.updateCompany(+localStorage.getItem('userId'), this.company).subscribe(
      result => {
        this.companyFormGroup.controls.companyName.setValue(result.name);
        this.companyFormGroup.controls.description.setValue(result.description);
        this.companyFormGroup.controls.username.setValue(result.username);
        this.initialCompanyName = this.company.name;
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
    const company2 = new Company();
    company2.password = this.passwordFormGroup.controls.password.value;
    this.profileApiService.updateCompany(+localStorage.getItem('userId'), company2).subscribe(
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
        this.profileApiService.deleteCompany(+localStorage.getItem('userId')).subscribe(
          result => {
            console.log('user deleted');
            localStorage.removeItem('token');
            localStorage.removeItem('accountType');
            localStorage.removeItem('userId');
            this.router.navigate(['/login']);
          },
          error => console.log(JSON.stringify(error)));
      }
    });
  }
}
