import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  //model: any={};
  profileForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });



  constructor(public accountService:AccountService,private toastrService:ToastrService){}

  ngOnInit(): void {
  }


  login(){
    console.log(this.profileForm.value);
    this.accountService.login(this.profileForm.value).subscribe({
      next : () => {
        this.toastrService.success("Successfull login")
      },
      error : error => this.toastrService.error(error.error)
    });
  }

  logout(){
    this.accountService.logout();
  }
}
