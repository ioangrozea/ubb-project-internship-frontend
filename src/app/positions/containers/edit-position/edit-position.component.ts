import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PositionService} from '../../service/position.service';
import {Position} from '../../model/position';
import {EditService} from '../../service/edit.service';
import {NotificationService} from '../../../shared/service/NotificationService';
import {UserType} from '../../../login/model/login-request';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  position: Position;
  hide = true;

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
    this.position = this.editService.getPosition();
    this.registerForm.setValue({
      title: this.position.title,
      description: this.position.description,
      numberOfPositions: this.position.numberOfPositions,
      email: this.position.email,
      url: this.position.url,
    });
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
    this.positionService.editPosition(this.position).subscribe(
      () => {
        this.notificationService.createToastrSuccess('Position information successfully updated', 'SUCCESS');
        console.log('item:' + localStorage.getItem('accountType'));
        console.log('enum:' + UserType.ROLE_ADMIN.toString());
        if (localStorage.getItem('accountType') === 'ROLE_COMPANY') {
          this.router.navigate(['positions/company']);
        } else if (localStorage.getItem('accountType') === 'ROLE_ADMIN') {
          this.router.navigate(['positions/admin']);
        }
      });
  }
}
