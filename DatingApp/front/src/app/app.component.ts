import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountService } from './_services/account.service';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,HomePageComponent,RegisterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'front';
  users:any;
  
  constructor(private http:HttpClient,private accountService:AccountService){}

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get("https://localhost:7015/api/Users").subscribe({
      next:response => this.users=response,
      error:error => console.log(error),
      complete:() => console.log("Request has completed")
    })
  }

  setCurrentUser(){
    const user=localStorage.getItem('user');
    if(!user) return;
    this.accountService.setCurrentUser(JSON.parse(user));
  }



}
