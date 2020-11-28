import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from './containers';


const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
  }, {
    path: 'company',
    component: StudentComponent,
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
