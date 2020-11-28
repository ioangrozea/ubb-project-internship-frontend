import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  },
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
