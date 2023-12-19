
import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyAuthService } from 'projects/fy-services/src/public-api';

@Injectable()
export class FyAuthInterceptorInterceptor implements HttpInterceptor {

  public authentication  = this.accesConstSvc.localStorageToken;

  constructor(private authSvc: FyAuthService, private accesConstSvc: FyAccessConstantsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const accessToken =  this.authSvc.getTokenStorage();
    
      req = req.clone({
          setHeaders: {
              'Authorization':`Bearer ${accessToken}`
          }
      });
      return next.handle(req);
  }
  
}
