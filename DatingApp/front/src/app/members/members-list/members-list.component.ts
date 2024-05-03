import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from '../../_models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css',
    imports: [MemberCardComponent,CommonModule,PaginationModule,FormsModule]
})
export class MembersListComponent implements OnInit {
  //members$:Observable<Member[]> | undefined;
  members: Member[] = [];
  pageNumber:number = 1;
  pageSize:number = 5;
  pagination:Pagination | undefined;
  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    //this.members$=this.memberService.getAllMembers();
    this.loadMember();
  }

  loadMember(){
    this.memberService.getAllMembers(this.pageNumber,this.pageSize).subscribe({
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

  changedPage(event:any){
    if(this.pageNumber!== event.page){
      this.pageNumber = event.page;
      this.loadMember();
    }
  }


}
