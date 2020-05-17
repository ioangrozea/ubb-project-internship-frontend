import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BaseComponent} from "../base-component";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent extends BaseComponent implements OnInit {

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }

  logout() {
    alert('That`s sad, you just logged out');
  }

  applyFilter() {
  }

  profile() {
    this.router.navigate(['home']);
  }

  about() {
    this.router.navigate(['about']);
  }

  consultation() {
    this.router.navigate(['in-consultation']);
  }

  archive() {
    this.router.navigate(['archive']);
  }

  members() {
    this.router.navigate(['users']);
  }

  login() {
    this.router.navigate(['authentication/log-in']);
  }

}
