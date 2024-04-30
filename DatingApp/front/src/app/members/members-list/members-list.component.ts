import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css',
    imports: [MemberCardComponent,CommonModule]
})
export class MembersListComponent implements OnInit {
  members$:Observable<Member[]> | undefined;

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.members$=this.memberService.getAllMembers();
  }


}
