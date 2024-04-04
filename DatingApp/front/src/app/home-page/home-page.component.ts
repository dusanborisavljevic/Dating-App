import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  registerMode = false;

  constructor(){}

  setRegisterMode(){
    this.registerMode= !this.registerMode;
  }

  registerCancelEvent(event:boolean){
    this.registerMode=event;
  }

}
