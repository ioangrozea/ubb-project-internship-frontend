import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {UserOption} from "../../model/user-option";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnChanges, OnDestroy {

  @Input() userOptions$: Observable<UserOption[]>;
  @Output("newOptions") newOptions = new EventEmitter<UserOption[]>();
  @Output("deletedOptions") deletedOptions = new EventEmitter<UserOption[]>();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  preferencesCtrl = new FormControl();
  filteredPreferences: Observable<string[]>;
  initialOptions: UserOption[];
  userOptions: UserOption[];
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
    let numberOfCharacters = this.userOptions.map(userPreference => userPreference.text).join().length + value.length;
    // Add our preference
    if ((value || '').trim() && this.userOptions.length < this.max_length && numberOfCharacters < this.max_word_length) {
      this.userOptions.push(new UserOption(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.preferencesCtrl.setValue(null);
  }

  remove(preference: string): void {
    const index = this.userOptions.findIndex(userPreference => userPreference.text === preference);

    if (index >= 0) {
      this.userOptions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userOptions.push(new UserOption(event.option.viewValue));
    this.preferenceInput.nativeElement.value = '';
    this.preferencesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPreferences.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("userOptions$")) {
      this.userOptions$.subscribe(userOptions => {
        if (userOptions) {
          this.initialOptions = userOptions;
          return this.userOptions = userOptions;
        }
      })
    }
  }

  ngOnDestroy(): void {
    let newOptions = this.userOptions.filter(userPreference => !userPreference.id);
    let deletedOptions =this.initialOptions.filter(userOption => !this.userOptions.includes(userOption))
    this.newOptions.emit(newOptions);
    this.deletedOptions.emit(deletedOptions);
  }
}
