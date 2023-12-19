import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerBgService {

  messageSpinnerBg = signal('');
  visibleSpinnerBg = signal(false);

  constructor() { }

  showSpinnerBg(message: string){
    this.messageSpinnerBg.set(message);
    this.visibleSpinnerBg.set(true);
  }

  closeSpinnerBg(){
    this.messageSpinnerBg.set("");
    this.visibleSpinnerBg.set(false);
  }

}
