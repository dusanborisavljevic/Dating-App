import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from '../../_models/pagination';
import { FormsModule } from '@angular/forms';
import { userParams } from '../../_models/userParams';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/User';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css',
    imports: [MemberCardComponent,CommonModule,PaginationModule,FormsModule,ButtonsModule]
})
export class MembersListComponent implements OnInit {
  //members$:Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination:Pagination | undefined;
  userparams: userParams | undefined;
  user:User | undefined;
  genderList = [{value:'male',display:'Males'},{value:'female',display:'Females'}]
  constructor(private memberService:MembersService,private accountSerice:AccountService){
    this.userparams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    //this.members$=this.memberService.getAllMembers();
    this.loadMember();
  }

  loadMember(){
    if(this.userparams){
      this.memberService.setUserParams(this.userparams);
      this.memberService.getAllMembers(this.userparams).subscribe({
        next: response =>{
          if(response.result){
            this.members = response.result;
          }
          if(response.pagination){
            this.pagination = response.pagination;
          }
        }
      })
    }
    
  }

  resetFilters(){
    this.userparams = this.memberService.resetUserParams();
    this.loadMember();

  }

  changedPage(event:any){
    if(this.userparams && this.userparams?.pageNumber!== event.page){
      this.userparams.pageNumber = event.page;
      this.memberService.setUserParams(this.userparams);
      this.loadMember();
    }
  }


}
