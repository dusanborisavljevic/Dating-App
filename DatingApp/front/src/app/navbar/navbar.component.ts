import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  //model: any={};
  profileForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });



  constructor(public accountService:AccountService){}

  ngOnInit(): void {
  }


  login(){
    console.log(this.profileForm.value);
    this.accountService.login(this.profileForm.value).subscribe({
      next : response => {
        console.log(response)
      },
      error : error => console.log(error)
    });
  }

  logout(){
    this.accountService.logout();
  }
}
