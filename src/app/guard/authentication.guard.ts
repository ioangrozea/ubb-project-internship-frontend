import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../login/service';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // not logged in so redirect to login page with the return url
    if (this.authenticationService.getAuthToken()) {
      return true;
    }

    this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
