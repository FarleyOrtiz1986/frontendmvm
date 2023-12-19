import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FyBodyManagerService {

  formData: FormData | undefined;

  constructor() {  }

  create(){
    this.formData = new FormData();
  }

  append(name: string, object: any){
    this.append(name, object);
  }

}
