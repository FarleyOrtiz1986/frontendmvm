import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuardsService {

  routeLogin = signal('');
  routeNotLogin = signal('');

  constructor() { }

  setRouteLogin(route: string) {
    this.routeLogin.set(route);
  }

  setRouteNotLogin(route: string) {
    this.routeNotLogin.set(route);
  }

}
