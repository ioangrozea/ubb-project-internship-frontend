import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './container';
import {StudentComponent} from '../register/containers/student/student.component';
import {CompanyComponent} from '../register/containers/company/company.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
