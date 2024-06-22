import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";

import { tap } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { RoleEnum } from "../models/role.model";

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const expectedRoles: RoleEnum[] = route.data["role"];

  const isRoleAuthorized: boolean = authService.belongToAnyRoles(expectedRoles);

  // If not authorized, then goes to the unauthorized page
  if (!isRoleAuthorized) {
    router.navigate(["unauthorized"]);
  }

  return !!isRoleAuthorized;
};
