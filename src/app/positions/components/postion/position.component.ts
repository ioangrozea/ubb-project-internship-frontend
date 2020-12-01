import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';

@Component({
  selector: 'app-portion',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent {
  @Input()
  position: Position;
  @Input()
  isEditable: boolean;
}
