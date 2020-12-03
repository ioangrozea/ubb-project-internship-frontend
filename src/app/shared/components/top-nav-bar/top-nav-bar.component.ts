import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseComponent} from '../base-component';
import {AuthenticationService} from '../../../login/service';
import {UserType} from '../../../login/model/login-request';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent extends BaseComponent {

  constructor(private router: Router,
              public authenticationService: AuthenticationService) {
    super();
  }

  positions() {
    switch (+UserType[localStorage.getItem('accountType')]) {
      case UserType.ROLE_STUDENT:
        this.router.navigate(['positions/student']);
        break;
      case UserType.ROLE_COMPANY:
        this.router.navigate(['positions/company']);
        break;
    }
  }

  logOut(){
    this.authenticationService.logOut();
  }

  profile() {
    switch (+UserType[localStorage.getItem('accountType')]) {
      case UserType.ROLE_STUDENT:
        this.router.navigate(['profile/student']);
        break;
      case UserType.ROLE_COMPANY:
        this.router.navigate(['profile/company']);
        break;
    }
  }
}
