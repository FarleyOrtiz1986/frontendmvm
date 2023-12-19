import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';
import { RoutesGuardsService } from './routes-guards.service';



export const checkLoginGuard: CanActivateFn = (route, state) => {

  const authSvc = inject(FyAuthService);
  const router = inject(Router);
  const routeGuardSvc = inject(RoutesGuardsService);


  const authStorage = authSvc.getTokenStorage();

  if (authStorage !== null && authStorage !== undefined) {
    return true;
  } else {
    localStorage.clear();
    //Ruta de no logueado : ejemmplo,  '/' router.navigate(['/']);
    // router.navigate([routeGuardSvc.routeNotLogin()]);
    console.log(routeGuardSvc.routeNotLogin());
    router.navigate(['/']);
    return false;
  }
};
