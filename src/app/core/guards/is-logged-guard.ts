import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const cookiesService = inject(CookieService)
  const router = inject(Router);

  if (cookiesService.get('token')) {
    return router.parseUrl('/home');
  }
  return true
};
