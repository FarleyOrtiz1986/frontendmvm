import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  typeToast = signal('success');
  messageToast = signal('');
  visibleToast = signal(false);

  constructor() { }

  activateToastNotification(typeToastParam : string, messageToastParam : string){
    this.typeToast.set(typeToastParam);
    this.messageToast.set(messageToastParam);
    var visibleToastParam =  !this.visibleToast();
    this.visibleToast.set(visibleToastParam);
  }

}

//[typeToast]="typeToast" [message]="messageToast" [visible]="visibleToas"
