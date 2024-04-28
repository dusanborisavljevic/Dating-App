import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = "https://localhost:7015/api/";

  constructor(private http:HttpClient) { }
  
  getAllMembers(){
    return this.http.get<Member[]>(this.baseUrl+"Users",this.getHttpOptions());
  }

  getMemberMyUserName(username:string){
    return this.http.get<Member>(this.baseUrl+"Users/"+username,this.getHttpOptions());
  }

  getHttpOptions(){
    const userString = localStorage.getItem("user");
    if(!userString)return;

    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+user.value.token
      })
    }
  }

}
