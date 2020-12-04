import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PositionService} from '../../service/position.service';
import {Position} from '../../model/position';
import {EditService} from '../../service/edit.service';
import {NotificationService} from '../../../shared/service/NotificationService';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {
  position: Position = new Position();

  public registerForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    numberOfPositions: new FormControl(''),
    email: new FormControl(''),
    url: new FormControl(''),
  });

  constructor(private router: Router,
              private positionService: PositionService,
              private editService: EditService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((request) => {
      this.position.title = request.title;
      this.position.description = request.description;
      this.position.numberOfPositions = request.numberOfPositions;
      this.position.email = request.email;
      this.position.url = request.url;
    });
  }

  onSubmit() {
    for (const control in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(control)) {
        this.registerForm.controls[control].markAsUntouched();
        this.registerForm.controls[control].setErrors({});
      }
    }
  }

  public save() {
    this.positionService.addPosition(this.position).subscribe(
      () => {
        this.router.navigate(['positions/company']);
        this.notificationService.createToastrSuccess('New position was successfully created', 'SUCCESS');
      });
  }
}
