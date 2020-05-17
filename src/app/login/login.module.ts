import {NgModule} from '@angular/core';
import {LoginRotingModule} from "./login-roting.module";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import * as fromContainers from "../login/container";
import * as fromHttpServices from './http';
import * as fromServices from './service';

// modules


@NgModule({
  imports: [
    SharedModule,
    LoginRotingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    ...fromContainers.components,
  ],
  providers: [
    ...fromHttpServices.apiServices,
    ...fromServices.services,
  ],
})
export class LoginModule {
}
