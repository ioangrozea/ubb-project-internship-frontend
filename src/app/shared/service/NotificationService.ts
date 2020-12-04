import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
  constructor(private toastrService: ToastrService) {
  }

  createToastrSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      extendedTimeOut: 3500
    });
  }

  createToastrError(message: string, title: string) {
    this.toastrService.error(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      extendedTimeOut: 3500
    });
  }
}
