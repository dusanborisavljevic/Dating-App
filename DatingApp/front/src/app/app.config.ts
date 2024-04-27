import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptorInterceptor, httpInterceptorProviders } from './_interceptors/error-interceptor.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),BrowserAnimationsModule,BsDropdownModule,
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideHttpClient(withInterceptors([errorInterceptorInterceptor]))
  ]
};
