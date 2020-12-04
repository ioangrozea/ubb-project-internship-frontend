import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from '../../model/position';
import {PositionService} from '../../service/position.service';
import {Router} from '@angular/router';
import {EditService} from '../../service/edit.service';
import {NotificationService} from '../../../shared/service/NotificationService';

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
  @Output() deleted: EventEmitter<Position> = new EventEmitter();

  constructor(private positionService: PositionService,
              private router: Router,
              private editService: EditService,
              private notificationService: NotificationService) {
  }

  deletePosition() {
    this.positionService.deletePortion(this.position.id).subscribe(() => {
      this.notificationService.createToastrSuccess('Position successfully deleted', 'SUCCESS');
      this.deleted.emit(this.position);
    });
  }

  editPosition() {
    this.editService.setPosition(this.position);
    this.router.navigate(['positions/edit']);
  }
}
