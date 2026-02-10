import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  const userLogining = localStorage.getItem('userLogining');

  if (!userLogining) {
    router.navigate(['/login']);
    return false;
  } 

  return true;
};
