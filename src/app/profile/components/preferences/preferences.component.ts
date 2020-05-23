import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {UserPreference} from "../../model/user-preference";
import {UserOption} from "../../model/user-option";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnChanges {

  @Input() userPreferences$: Observable<UserOption[]>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  preferencesCtrl = new FormControl();
  filteredPreferences: Observable<string[]>;
  userPreferences: UserOption[];
  allPreferences: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  max_length = 6;
  max_word_length = 30;

  @ViewChild('preferenceInput') preferenceInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredPreferences = this.preferencesCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allPreferences.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let numberOfCharacters = this.userPreferences.map(userPreference => userPreference.text).join().length + value.length;
    // Add our preference
    if ((value || '').trim() && this.userPreferences.length < this.max_length && numberOfCharacters < this.max_word_length) {
      this.userPreferences.push(new UserOption(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.preferencesCtrl.setValue(null);
  }

  remove(preference: string): void {
    const index = this.userPreferences.findIndex(userPreference => userPreference.text === preference);

    if (index >= 0) {
      this.userPreferences.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userPreferences.push(new UserOption(event.option.viewValue));
    this.preferenceInput.nativeElement.value = '';
    this.preferencesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPreferences.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("userPreferences$")) {
      this.userPreferences$.subscribe(userPreferences => {
        if (userPreferences)
          return this.userPreferences = userPreferences;
      })
    }
  }
}
