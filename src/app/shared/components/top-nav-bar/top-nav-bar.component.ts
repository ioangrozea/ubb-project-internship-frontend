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
export class TopNavBarComponent extends BaseComponent implements OnInit {

  constructor(private router: Router,
              public authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
  }

  positions() {
    this.router.navigate(['positions']);
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
