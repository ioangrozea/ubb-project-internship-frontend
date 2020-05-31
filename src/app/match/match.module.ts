import { NgModule } from '@angular/core';
import {MatchRotingModule} from "./match-roting.module";
import {SharedModule} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatchComponent} from "./container/match.component";
import {ProfileModule} from "../profile/profile.module";
import * as fromHttpServices from './http';

// modules


@NgModule({
  imports: [
    SharedModule,
    MatchRotingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgbCarouselModule,
    MatAutocompleteModule,
    MatChipsModule,
    ProfileModule,
  ],
  declarations: [
    MatchComponent
  ],
  providers: [
    ...fromHttpServices.apiServices,
  ],
})
export class MatchModule {}
