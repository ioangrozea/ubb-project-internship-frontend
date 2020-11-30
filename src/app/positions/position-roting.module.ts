import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionListComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';

// pt noob aici faici routing pt toate componentele din container
const routes: Routes = [
  {
    path: '',
    component: PositionListComponent,
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
