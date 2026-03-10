import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const AUTH_SERVICE = inject(AuthService)
  const ROUTER = inject(Router)

  if(AUTH_SERVICE.getIsAuthenticated())
    return true;

  return ROUTER.createUrlTree(['/gestor/login'])


};
