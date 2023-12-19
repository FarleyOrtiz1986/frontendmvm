import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConnectionService } from 'projects/fy-lib-comp/src/services/connection.service';
import { FyAuthService } from './fy-auth.service';
import { FyHeaderManagerService } from './fy-header-manager.service';


@Injectable({
  providedIn: 'root'
})
export class FyCrudService {


  public urlBase = "";
  connectSvc = inject(ConnectionService);
  headerSvc = inject(FyHeaderManagerService);
  authSvc = inject(FyAuthService);

  constructor(private http: HttpClient) {}

  getItem( route: string, itemId: any): Observable<any>  {
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    // var token = this.authSvc.getTokenStorage();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer ' + token
    //   }),
    // };
    return this.http.get<any>(this.urlBase + route + itemId);
  }

  getAllItems( route: string): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    // var token = this.authSvc.getTokenStorage();
    // console.log(token);
     let httpOptions = {
       headers: new HttpHeaders({
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*'
       }),
     };
    return this.http.get<any>(this.urlBase + route,  httpOptions);
  }

  getAllItemsParam( route: string,  itemId: any): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
   // console.log(this.authSvc.getTokenStorage());
    // var token = this.authSvc.getTokenStorage();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer ' + token
    //   }),
    // };
    // console.log(token);
    // console.log(httpOptions);
    return this.http.get<any>(this.urlBase + route + itemId);
  }


  getAllItemsParamPdf( route: string,  itemId: any): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    //var token = this.authSvc.getTokenStorage();
    // const headers = new HttpHeaders(
    //   {
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer ' + token
    //   }
    // );
   // return this.http.get<any>(this.urlBase + route + itemId, {headers, responseType: 'blob' as 'json'});
       return this.http.get<any>(this.urlBase + route + itemId, {responseType: 'blob' as 'json'});

  }


  createItem( route: string, item: any): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    //var token = this.authSvc.getTokenStorage();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer ' + token
    //   }),
    // };
    return this.http.post<any>(this.urlBase + route, item);
  }



  updateItem( route: string, itemId: any,  item: any): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    return this.http.put<any>(this.urlBase + route + itemId, item, this.headerSvc.headerToken());
  }

  deleteItem( route: string, itemId: number): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    return this.http.delete<any>(this.urlBase + route + itemId, this.headerSvc.headerToken());
  }



  postGeneric( route: string, formData: any): Observable<any>{
    if(!this.connectSvc.validateConnectionInternet()){
      return throwError(() => new Error('No tienes conexión a internet'));
    }
    // var token = this.authSvc.getTokenStorage();
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer ' + token
    //   }),
    // };
    return this.http.post<any>(this.urlBase + route, formData);
  }


}
