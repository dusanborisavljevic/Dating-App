import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable, map, of, take } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';
import { userParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = "https://localhost:7015/api/";
  members: Member[] = [];
  membersCache = new Map();
  userparams:userParams | undefined;
  user:User | undefined;
  constructor(private http:HttpClient,private accountSerice:AccountService) {
    this.accountSerice.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          this.userparams = new userParams(user);
          this.user = user;
        }
      }
    })
   }

   setUserParams(userParamsPom:userParams){
    this.userparams = userParamsPom;
   }

   getUserParams(){
    return this.userparams;
   }

   resetUserParams(){
    if(this.user){
      console.log("usao sam u reset")
      this.userparams = new userParams(this.user);
      return this.userparams;
    }
    return;
  
   }
  
  getAllMembers(userparams:userParams){
    const responsePom = this.membersCache.get(Object.values(userparams).join("-"));
    if(responsePom) return of(responsePom);
    let params = this.getPaginationHeaders(userparams.pageNumber,userparams.pageSize);
    params = params.append('gender',userparams.gender);
    params = params.append('orderBy',userparams.orderBy);
    return this.getPaginationResult<Member[]>(this.baseUrl+'Users',params).pipe(
      map(response=>{
        if(response){
          this.membersCache.set(Object.values(userparams).join("-"),response);
        }
        return response;
      })
    )
  }



  getMemberMyUserName(username:string){
    const member = [...this.membersCache.values()].reduce((arr,elem)=>arr.concat(elem.result),[]).find((member:Member)=>member.userName ===username);
    if(member) return of(member);
    console.log(member);
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

  private getPaginationResult<T>(url:string,params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params: params, headers: this.getHttpOptions()?.headers }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const header = response.headers.get('Pagination');
        if (header) {
          paginatedResult.pagination = JSON.parse(header);
        }

        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize:number) {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize);
    params = params.append('pageNumber', pageNumber);
    return params;
  }

}
