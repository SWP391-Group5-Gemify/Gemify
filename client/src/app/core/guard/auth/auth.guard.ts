import { CanActivateFn } from '@angular/router';

/*
  route: ActivatedRouteSnapshot
  state: RouterStateSnapshot
*/
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
