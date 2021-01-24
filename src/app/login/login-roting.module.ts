import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './container';
import {StudentComponent} from '../register/containers';
import {CompanyComponent} from '../register/containers';
import {AdminLoginComponent} from './container/admin-login/admin-login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, {
    path: 'admin',
    component: AdminLoginComponent,
  }, {
    path: 'register/student',
    component: StudentComponent,
  }, {
    path: 'register/company',
    component: CompanyComponent,
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
export class LoginRotingModule {
}
