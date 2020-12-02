import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyPositionsComponent, EditPositionComponent, StudentPositionsComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';

const routes: Routes = [
  {
    path: 'student',
    component: StudentPositionsComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  }, {
    path: 'company',
    component: CompanyPositionsComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  }, {
    path: 'edit',
    component: EditPositionComponent,
    canActivate: [
      AuthenticationGuard,
    ],
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
export class PositionRotingModule {
}
