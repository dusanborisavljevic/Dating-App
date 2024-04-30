import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = "https://localhost:7015/api/";
  members: Member[] = [];
  constructor(private http:HttpClient) { }
  
  getAllMembers(){
    if(this.members.length>0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+"Users",this.getHttpOptions()).pipe(
      map(response =>{
        this.members=response;
        return response;
      })
    );
  }

  getMemberMyUserName(username:string){
    if(this.members.length>0){
      return of(this.members.find(x => x.userName === username))
    }
    return this.http.get<Member>(this.baseUrl+"Users/"+username,this.getHttpOptions());
  }

  getHttpOptions(){
    const userString = localStorage.getItem("user");
    if(!userString)return;

    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+user.token
      })
    }
  }

  updateMember(member:Member){
    console.log(member)
    const user = localStorage.getItem('user')
    if(user){
      const userObject = JSON.parse(user)
      console.log(userObject.userName)
      const member1 = this.members.find(x => x.userName === userObject.userName)
      if(member1){
        const index = this.members.indexOf(member1)
        this.members[index]={...this.members[index],...member}
      }
      
    }
    
    
  }

}
