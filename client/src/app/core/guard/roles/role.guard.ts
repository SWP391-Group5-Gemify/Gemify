import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isRoleAuthorized = authService.currentUser?.role.includes(
    route.data['role']
  );

  if (!isRoleAuthorized) {
    //TODO: show error page, toast or any message notify user
    alert('You are not authorized');
  }

  return !!isRoleAuthorized;
};
