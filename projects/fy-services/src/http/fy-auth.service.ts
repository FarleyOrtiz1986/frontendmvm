import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConnectionService } from 'projects/fy-lib-comp/src/services/connection.service';
import { ToastNotificationService } from 'projects/fy-lib-comp/src/services/toast-notification.service';
import { FyAccessConstantsService } from '../acces-conts/fy-access-constants.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FyAuthService {

  public urlBase = "";
  connectSvc = inject(ConnectionService);
  accConstSvc = inject(FyAccessConstantsService);
  toastNotSvc = inject(ToastNotificationService);

  constructor(private http: HttpClient,  private router: Router) {}  

  register( route: string, item: any): Observable<any>{
    if(this.connectSvc.validateConnectionInternet()==false){
      this.toastNotSvc.activateToastNotification("danger","No tienes conexión a internet");
      return throwError(() => new Error('No tienes conexión a internet'));
    } else {
      return this.http.post<any>(this.urlBase + route, item);
    }
   
  }

  login( route: string, item: any): Observable<any>{
    if(this.connectSvc.validateConnectionInternet()==false){
      this.toastNotSvc.activateToastNotification("danger","No tienes conexión a internet");
      return throwError(() => new Error('No tienes conexión a internet'));
    } else {
      return this.http.post<any>(this.urlBase + route, item);
    }
  }

  setTokenStorage(token: string){
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(this.accConstSvc.localStorageToken, token);
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
    }
  }

  setUserAuthStorage(user: any){
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(this.accConstSvc.localStorageUser, JSON.stringify(user));
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
    }
  }

   
  setUsusarioAuthStorage( usuario: any){
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(this.accConstSvc.localStorageUsuario, JSON.stringify(usuario));
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
    }
  }

  getTokenStorage(){
    if (typeof Storage !== 'undefined') {
      if (!localStorage.getItem(this.accConstSvc.localStorageToken)) {
        return undefined;
      }
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key!);
      }
      var item = localStorage.getItem(this.accConstSvc.localStorageToken)!;
      if(Object.keys(item).length === 0){
        return undefined;
      }
       if(item == null || typeof item == 'undefined' ){
         return undefined;
       }
       return item;
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
      return null;
    }
  }

  getUserAuthStorage(){
    if (typeof Storage !== 'undefined') {
      var item = localStorage.getItem(this.accConstSvc.localStorageUser)!;
      if(item === null || item === undefined){
        return undefined;
      }
      var userAut =  JSON.parse(item);
      if(userAut === null || userAut === undefined){
        return undefined;
      }
      return userAut;
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
      return undefined;
    }
  }


  getUsuarioAuthStorage(){
    if (typeof Storage !== 'undefined') {
      var item = localStorage.getItem(this.accConstSvc.localStorageUsuario)!;
      if(item === null || item === undefined){
        return undefined;
      }
      var userAut =  JSON.parse(item);
      if(userAut === null || userAut === undefined){
        return undefined;
      }
      return userAut;
    } else {
      this.toastNotSvc.activateToastNotification("danger","Debes activar el storage u localStorage de tu navegar para el correcto funcionamiento de la plataforma");
      return undefined;
    }
  }



  closeSession( route: string) : any {
    if(this.connectSvc.validateConnectionInternet()){
      this.http.get(this.urlBase + route);
    } 
    localStorage.clear();
    this.router.navigate(['/']);
  }

  forgotPassword( route: string, item: any): Observable<any>{
    if(this.connectSvc.validateConnectionInternet()==false){
      this.toastNotSvc.activateToastNotification("danger","No tienes conexión a internet");
      return throwError(() => new Error('No tienes conexión a internet'));
    } else {
      return this.http.post<any>(this.urlBase + route, item);
    }
  }


  resetPassword( route: string, item: any): Observable<any>{
    if(this.connectSvc.validateConnectionInternet()==false){
      this.toastNotSvc.activateToastNotification("danger","No tienes conexión a internet");
      return throwError(() => new Error('No tienes conexión a internet'));
    } else {
      return this.http.post<any>(this.urlBase + route, item);
    }
  }

 

}
