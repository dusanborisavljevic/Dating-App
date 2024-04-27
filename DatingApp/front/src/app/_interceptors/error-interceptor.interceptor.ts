import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
     console.log(error)
      if(error){
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modelStateErrors=[];
              for(const key in error.error.errors){
                modelStateErrors.push(error.error.errors[key])
              }
              throw modelStateErrors;
            }else{
              inject(ToastrService).error(error.error,error.status.toString())
            }
            break;
          case 401:
            inject(ToastrService).error("Unauthorized",error.status.toString())
            break;
          case 404:
            inject(ToastrService).error("Not found",error.status.toString())
            inject(Router).navigateByUrl("/")
            break;
          case 500:
            const NavigationExtras:NavigationExtras = {state :{error:error.error}}
            inject(Router).navigateByUrl("/server-error",NavigationExtras)
            break;
          default:
            inject(ToastrService).error("Unexpected error")
            console.log(error)
            break;
        }
      }


      return throwError(()=>error)
    })
  );
};

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: errorInterceptorInterceptor, multi: true },
];
