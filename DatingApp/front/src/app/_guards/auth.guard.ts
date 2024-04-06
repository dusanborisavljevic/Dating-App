import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { User } from '../_models/User';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AccountService).isLoggedIn())
    return true;
  inject(Router).navigate(['']);
 return false;
};
