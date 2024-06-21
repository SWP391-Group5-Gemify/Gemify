import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(delay(300));
};
