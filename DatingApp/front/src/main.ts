import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(
          BrowserModule
      ),
      provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch((err) => console.error(err));
