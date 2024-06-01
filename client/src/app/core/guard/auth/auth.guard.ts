import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map, tap } from 'rxjs';

/*
  route: ActivatedRouteSnapshot
  state: RouterStateSnapshot
*/
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If not login => token remove => always redirect to  /login route
  // CanActivateFn will auto subscribe to the observable<boolean>, that's why it can get the emit value

  //FIXME: Currently comment out since the api connection is unavailable yet
  // return authService.isLoggedIn$.pipe(
  //   tap((isLoggedIn) => {
  //     if (!isLoggedIn) {
  //       router.navigate(['login']);
  //     }
  //   })
  // );
};
