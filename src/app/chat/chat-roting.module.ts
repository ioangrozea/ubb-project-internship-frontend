import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./container/chat.component";
import {AuthenticationGuard} from "../guard/authentication.guard";


const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    /*canActivate: [
      AuthenticationGuard,
    ],*/
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
export class ChatRotingModule {}
