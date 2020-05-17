import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  preferencesCtrl = new FormControl();
  filteredPreferences: Observable<string[]>;
  preference: string[] = ['Lemon'];
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
    let numberOfCharacters = this.preference.join().length + value.length;
    // Add our preference
    if ((value || '').trim() && this.preference.length < this.max_length && numberOfCharacters < this.max_word_length) {
      this.preference.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.preferencesCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.preference.indexOf(fruit);

    if (index >= 0) {
      this.preference.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.preference.push(event.option.viewValue);
    this.preferenceInput.nativeElement.value = '';
    this.preferencesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPreferences.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
