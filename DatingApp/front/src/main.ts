import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptorInterceptor } from './app/_interceptors/error-interceptor.interceptor';


bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(
          BrowserAnimationsModule,
          BrowserModule,
          BsDropdownModule.forRoot(),
          RouterModule,
          ToastrModule.forRoot({
            positionClass : 'toast-bottom-right'
          })
      ),
      provideHttpClient(withInterceptorsFromDi()),
      provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
