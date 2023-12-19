import { Injectable, inject } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
import { ToastNotificationService } from './toast-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  toastNotSvc = inject(ToastNotificationService);
  constructor() {
    fromEvent(window, 'offline').pipe(
      debounceTime(100)).subscribe((event: Event) => {
        this.toastNotSvc.activateToastNotification("danger","No hay conexión a internet");
        return false;
      });
    fromEvent(window, 'online').pipe(
      debounceTime(100)).subscribe((event: Event) => {
        this.toastNotSvc.activateToastNotification("success"," Conexión a internet restablecida");
        return true;
      });
  }

  validateConnectionInternet() {
    if (!navigator.onLine) {
      this.toastNotSvc.activateToastNotification("danger","No hay conexión a internet");
      return false;
    }
    return true;
  }

}
