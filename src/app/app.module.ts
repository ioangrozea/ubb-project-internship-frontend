import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from './shared/shared.module';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from './interceptors/header.interceptor';
import * as fromGuards from './guard';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ToastrModule} from 'ngx-toastr';
import {NotificationService} from './shared/service/NotificationService';
import {ErrorInterceptor} from './interceptors/ErrorInterceptor';

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
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    NgbModule,
    MatCardModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ...fromGuards.guards,
    httpInterceptorProviders,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
