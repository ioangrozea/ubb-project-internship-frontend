import {NgModule} from '@angular/core';
import {ProfileRotingModule} from "./profile-roting.module";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromHttpServices from './http';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeaderInterceptor} from "../interceptors/header.interceptor";
import {JwtInterceptor} from "../interceptors/jwt.interceptor";
import {MatSelectModule} from "@angular/material/select";

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
        ProfileRotingModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        NgbCarouselModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatSelectModule,
    ],
  declarations: [
    ...fromContainers.components,
    ...fromComponents.components,
  ],
  providers: [
    ...fromHttpServices.apiServices,
    httpInterceptorProviders,
  ],
})
export class ProfileModule {
}
