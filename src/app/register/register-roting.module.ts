import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent, StudentComponent} from './containers';


const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
  }, {
    path: 'company',
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
export class RegisterRotingModule {
}
