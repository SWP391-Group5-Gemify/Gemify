import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { httpInterceptorInterceptor } from "./core/interceptors/http/http-interceptor.interceptor";
import { loadingInterceptorInterceptor } from "./core/interceptors/loading/loading-interceptor.interceptor";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { importProvidersFrom } from '@angular/core';

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
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideStorage(() => getStorage()),
    ])
  ],
};
