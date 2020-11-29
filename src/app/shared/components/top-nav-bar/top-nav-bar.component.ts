import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseComponent} from '../base-component';
import {AuthenticationService} from '../../../login/service';

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

  profile() {
    this.router.navigate(['profile']);
  }

  logOut(){
    this.authenticationService.logOut();
  }

  chat() {
    this.router.navigate(['chat']);
  }

  match() {
    this.router.navigate(['match']);
  }
}
