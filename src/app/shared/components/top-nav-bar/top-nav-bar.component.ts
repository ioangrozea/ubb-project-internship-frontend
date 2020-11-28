import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseComponent} from '../base-component';
import {AuthenticationApiService} from '../../../login/http';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent extends BaseComponent implements OnInit {

  constructor(private router: Router,
              public authenticationApiService: AuthenticationApiService) {
    super();
  }

  ngOnInit() {
  }

  profile() {
    this.router.navigate(['profile']);
  }

  logOut(){
    this.authenticationApiService.logout();
  }

  chat() {
    this.router.navigate(['chat']);
  }

  match() {
    this.router.navigate(['match']);
  }
}
