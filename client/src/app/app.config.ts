import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { httpInterceptorInterceptor } from "./core/interceptors/http/http-interceptor.interceptor";
import { loadingInterceptorInterceptor } from "./core/interceptors/loading/loading-interceptor.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        httpInterceptorInterceptor,
        loadingInterceptorInterceptor,
      ])
    ),
  ],
};
