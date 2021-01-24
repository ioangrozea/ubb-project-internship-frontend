import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../guard/authentication.guard';
import {StudentProfileComponent} from './containers/student-profile/student-profile.component';
import {AdminProfileComponent, CompanyProfileComponent} from './containers';


const routes: Routes = [
  {
    path: 'student',
    component: StudentProfileComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  },
  {
    path: 'admin',
    component: AdminProfileComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  },
  {
    path: 'company',
    component: CompanyProfileComponent,
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
