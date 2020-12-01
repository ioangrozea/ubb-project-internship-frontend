import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentPositionsComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';
import {CompanyPositionsComponent} from './containers/company-positions/company-positions.component';

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
