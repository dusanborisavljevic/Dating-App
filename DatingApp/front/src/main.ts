import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(
          BrowserAnimationsModule,
          BrowserModule,
          BsDropdownModule.forRoot(),
      ),
      provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch((err) => console.error(err));
