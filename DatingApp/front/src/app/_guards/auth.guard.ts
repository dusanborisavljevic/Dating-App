import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AccountService).isLoggedIn())
    return true;
  inject(Router).navigate(['']);
 return false;
};
