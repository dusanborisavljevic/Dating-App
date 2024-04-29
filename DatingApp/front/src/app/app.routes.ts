import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path:'', component : HomePageComponent},
    {path : '',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children : [
            {path:'members',component : MembersListComponent},
            {path:'members/:username', component : MemberDetailComponent},
            {path:'member/edit', component : MemberEditComponent,canDeactivate:[preventUnsavedChangesGuard]},
            {path:'lists', component : ListsComponent},
            {path:'messages', component : MessagesComponent},
        ]
    },
    {path:'errorPage', component : ErrorPageComponent},
    {path:'**', component : HomePageComponent,pathMatch:'full'}
];
