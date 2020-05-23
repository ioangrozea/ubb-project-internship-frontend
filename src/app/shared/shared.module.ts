import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as fromComponents from './components';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import * as fromHttpServices from "../shared/components/carousel/http";

const modules = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
    imports: [
        modules,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NgbCarouselModule,
    ],
  exports: [
    ...fromComponents.components,
    modules,
  ],providers: [
    ...fromHttpServices.apiServices,
  ],
})
export class SharedModule {}
