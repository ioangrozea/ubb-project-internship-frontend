import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionComponent} from './containers';
import {AuthenticationGuard} from '../guard/authentication.guard';


// pt noob aici faici routing pt toate componentele din container
const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
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
export class PositionRotingModule {
}
