import {NgModule} from '@angular/core';
import {RegisterRotingModule} from './register-roting.module';
import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromHttpServices from './http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from '../interceptors/header.interceptor';
import {JwtInterceptor} from '../interceptors/jwt.interceptor';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";

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
    RegisterRotingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgbCarouselModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    ...fromContainers.components,
    ...fromComponents.components,
  ],
  providers: [
    ...fromHttpServices.apiServices,
    httpInterceptorProviders,
    DatePipe,
  ],
})
export class RegisterModule {
}
