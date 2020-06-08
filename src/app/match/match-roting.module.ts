import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchComponent} from "./container/match.component";
import {AuthenticationGuard} from "../guard/authentication.guard";


const routes: Routes = [
  {
    path: '',
    component: MatchComponent,
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
export class MatchRotingModule {}
