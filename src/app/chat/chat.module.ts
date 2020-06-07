import { NgModule } from '@angular/core';
import {ChatRotingModule} from "./chat-roting.module";
import {ChatComponent} from "./container/chat.component";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import * as fromHttpServices from './http';
import * as fromServices from './service';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeaderInterceptor} from "../interceptors/header.interceptor";
import {JwtInterceptor} from "../interceptors/jwt.interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
];

@NgModule({
  imports: [
    SharedModule,
    ChatRotingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    ChatComponent,
  ],
  providers:[
    ...fromHttpServices.apiServices,
    ...fromServices.apiServices,
    httpInterceptorProviders,
  ]
})
export class ChatModule {}
