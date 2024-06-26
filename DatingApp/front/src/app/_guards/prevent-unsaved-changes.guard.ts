import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component:MemberEditComponent) => {
  if(component.editForm?.dirty){
    return confirm("Are you sure you want to leave page?\nAll changes that you have been made will be lost!");
  }
  return true;
};
