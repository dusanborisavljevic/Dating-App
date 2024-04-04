import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7015/api/";
  private currentUserSource=new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }

  login(profileModel:any){
    console.log(profileModel);
    return this.http.post<User>(this.baseUrl+"Account/login",profileModel).pipe(
      map((response:User)=>{
        const user=response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  register(registerModel:any){
    return this.http.post<User>(this.baseUrl+"Account/register",registerModel).pipe(
      map((resposne:User) => {
        console.log(resposne);
        if(resposne){
          localStorage.setItem('user',JSON.stringify(resposne));
          this.currentUserSource.next(resposne);
        }
      })
    )
  }

}
