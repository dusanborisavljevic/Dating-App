import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RegisterComponent,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  registerMode = true;

  constructor(public accountService:AccountService){}

  setRegisterMode(){
    this.registerMode= !this.registerMode;
  }

  registerCancelEvent(event:boolean){
    this.registerMode=event;
  }

}
