import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


export const profileGuard: CanActivateFn = (route, state) => {
  const auth =  inject(AuthService);
  const router = inject(Router);
  if(!auth.isAuthenticated()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
