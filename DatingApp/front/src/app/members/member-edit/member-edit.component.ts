import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm')editForm:NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue=true;
    }
  }
  user:User | null = null;
  member:Member | undefined;
  constructor(private accountService:AccountService,private memberService:MembersService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: response =>{
        console.log(response)
        this.user=response;
      }
    })
  }

  ngOnInit(): void {
   this.loadMember();
  }

  loadMember(){
    if(!this.user)return;
    this.memberService.getMemberMyUserName(this.user.userName).subscribe({
      next: response =>{
        this.member = response;
      }
    })
  }

  updateMember(){
    this.memberService.updateMember(this.editForm?.value)
    //console.log(this.editForm?.value)
    this.editForm?.reset(this.member);
  }




}
