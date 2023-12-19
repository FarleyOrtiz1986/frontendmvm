import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FyAuthService } from './fy-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FyHeaderManagerService {

  authSvc = inject(FyAuthService);

  constructor() { }

  headerSingle(){
    return  {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
  }

  headerToken(){
    var token = this.authSvc.getTokenStorage();
    // return  {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Authorization': 'Bearer ' + token
    //   }),
    // };

    console.log(token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }),
    };

    return httpOptions;
  }
  
}
