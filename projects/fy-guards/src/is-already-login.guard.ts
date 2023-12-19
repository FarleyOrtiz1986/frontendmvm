import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoutesGuardsService } from './routes-guards.service';
import { FyAuthService } from 'projects/fy-services/src/http/fy-auth.service';




export const isAlreadyLoginGuard: CanActivateFn = (route, state) => {

  const authSvc = inject(FyAuthService);
  const router = inject(Router);
  const routeGuardSvc = inject(RoutesGuardsService);

  const authStorage = authSvc.getTokenStorage();
  if (authStorage !== undefined && authStorage !== null) {
    //Ruta de logueado: ejemplo router.navigate(['/home']);
    // router.navigate([routeGuardSvc.routeLogin()]);
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
