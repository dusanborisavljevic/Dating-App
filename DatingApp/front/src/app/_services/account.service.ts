import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7015/api/";
  private currentUserSource=new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient,private route:Router) { }

  login(profileModel:any){
    return this.http.post<User>(this.baseUrl+"Account/login",profileModel).pipe(
      map((response:User)=>{
        const user=response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.route.navigate(['']);
  }

  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  register(registerModel:any){
    return this.http.post<User>(this.baseUrl+"Account/register",registerModel).pipe(
      map((resposne:User) => {
        console.log(resposne);
        if(resposne){
          this.setCurrentUser(resposne);
        }
      })
    )
  }

  isLoggedIn(){
    return this.currentUserSource.value;
  }
  

}
