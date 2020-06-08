import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./containers";
import {RegisterComponent} from "./containers/register/register.component";
import {AuthenticationGuard} from "../guard/authentication.guard";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  }, {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProfileRotingModule {
}
