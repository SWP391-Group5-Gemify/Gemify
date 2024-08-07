import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  const token = authService.token;

  // Configure headers
  let headersConfig: { [key: string]: string } = {};

  // JWT Token
  if (token) {
    headersConfig['Authorization'] = `Bearer ${token}`;
  }

  // PUT or POST method, then send the JSON content-type
  if (req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH') {
    headersConfig['Content-Type'] = 'application/json';
  }

  // Clone the request with the updated headers
  const clonedReq = req.clone({
    setHeaders: headersConfig,
  });

  return next(clonedReq);
};
