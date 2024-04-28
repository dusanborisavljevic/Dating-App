import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css',
    imports: [MemberCardComponent]
})
export class MembersListComponent implements OnInit {
  members:Member[] = [];

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.memberService.getAllMembers().subscribe({
      next: response => this.members = response
    })
  }


}
