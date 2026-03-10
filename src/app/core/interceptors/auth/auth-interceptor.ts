import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { retry, shareReplay } from 'rxjs';

//services
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const AUTH_SERVICE = inject(AuthService)
  const PUBLIC_URL = ['/gestor/login', '/gestor/cadastro']
  const IS_PUBLIC = PUBLIC_URL.some(url => req.url.includes(url))

  if(AUTH_SERVICE.getIsAuthenticated() && !IS_PUBLIC){
    
    const AUTH_REQ = req.clone({
      setHeaders:{
        Authorization: `Bearer ${AUTH_SERVICE.getToken()}`
      }
    })

    return next(AUTH_REQ).pipe(
      retry({count: 2, delay: 2000}),
      shareReplay()
    )
  }


  return next(req);
};
