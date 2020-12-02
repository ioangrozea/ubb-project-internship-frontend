import {Injectable} from '@angular/core';
import {Position} from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  position: Position;

  setPosition(position: Position) {
    this.position = position;
  }

  getPosition(): Position {
    return this.position;
  }
}
