import { Injectable } from '@angular/core';
import { environment } from 'projects/fy-services/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FyAccessConstantsService {
  
  localStorageToken = environment.localStorageToken;
  localStorageUser = environment.localStorageUser;
  localStorageUsuario = environment.localStorageUsuario;

  messageErrorHttpGeneral = environment.messageErrorHttpGeneral;
 
  regularExpressEmail = environment.regularExpressEmail;

  typeField = environment.typeField;

  constructor() { }
}
