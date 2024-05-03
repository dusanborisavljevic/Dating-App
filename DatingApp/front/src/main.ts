import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(
          BrowserAnimationsModule,
          BrowserModule,
          BsDropdownModule.forRoot(),
          RouterModule,
          TabsModule.forRoot(),
          ToastrModule.forRoot({
            positionClass : 'toast-bottom-right'
          }),
          NgxGalleryModule,
          FileUploadModule,
          BsDatepickerModule.forRoot(),
          PaginationModule.forRoot()
      ),
      provideHttpClient(withInterceptorsFromDi()),
      provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
