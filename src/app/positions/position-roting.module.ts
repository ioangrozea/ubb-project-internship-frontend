import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddPositionComponent, CompanyPositionsComponent, EditPositionComponent, StudentPositionsComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';
import {AdminPositionsComponent} from './containers/admin-positions/admin-positions.component';

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
    path: 'admin',
    component: AdminPositionsComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  }, {
    path: 'edit',
    component: EditPositionComponent,
    canActivate: [
      AuthenticationGuard,
    ],
  }, {
    path: 'add',
    component: AddPositionComponent,
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
