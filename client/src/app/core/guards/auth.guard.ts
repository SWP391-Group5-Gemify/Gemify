import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { tap } from "rxjs";

/*
  Guarding Authentication (using JWT) and Authorization
  - Guarding Role-based Authentication
  - route: ActivatedRouteSnapshot
  - state: RouterStateSnapshot
  - CanActivateFn will auto subscribe to the observable<boolean>, that's why it can get the emit value

*/
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If not login => token remove => always redirect to  /login route
  return authService.isLoggedIn$.pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(["login"]);
        return false;
      } else {
        return true;
      }
    })
  );
};
