import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = "https://localhost:7015/api/";
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  constructor(private http:HttpClient) { }
  
  getAllMembers(pageNumber?:number, pageSize?:number){
   // if(this.members.length>0) return of(this.members);
    let params = new HttpParams();
    if(pageNumber && pageSize){
      params = params.append('pageSize',pageSize);
      params = params.append('pageNumber',pageNumber);
    }
    
    return this.http.get<Member[]>(this.baseUrl+"Users",{observe:'response',params:params,headers:this.getHttpOptions()?.headers}).pipe(
      map(response =>{
        if(response.body){
          this.paginatedResult.result = response.body;
        }
          const header = response.headers.get('Pagination');
          if(header){
            this.paginatedResult.pagination = JSON.parse(header);
          }
          
          return this.paginatedResult;
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

  updateMainPhotoOfMember(photo:Photo){
    return this.http.put(this.baseUrl+"Users/set-main-photo/"+photo.id,{},this.getHttpOptions());
  }

  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl+"Users/delete-photo/"+photoId,this.getHttpOptions());
  }

}
