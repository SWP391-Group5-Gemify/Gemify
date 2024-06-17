import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { catchError } from "rxjs";

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  const token = authService.token;

  // Configure headers
  let headersConfig: { [key: string]: string } = {};

  // JWT Token
  if (token) {
    headersConfig["Authorization"] = `Bearer ${token}`;
  }

  // PUT method, then send the JSON content-type
  if (req.method === "PUT") {
    headersConfig["Content-Type"] = "application/json";
  }

  // Clone the request with the updated headers
  const clonedReq = req.clone({
    setHeaders: headersConfig,
  });

  return next(clonedReq);
};
