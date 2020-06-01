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
  ]
})
export class ChatModule {}
