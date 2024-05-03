import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { User } from '../../_models/User';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { FileUploadModule } from "ng2-file-upload";
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent implements OnInit {
  @Input() member:Member | undefined;
  uploader:FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = "https://localhost:7015/api/";
  user : User | undefined;

  constructor(private accountService:AccountService,private memberService:MembersService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user)
          this.user=user;
      }
    })
  }
  
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl+"Users/add-photo",
      authToken: 'Bearer '+this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload:true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,response,status,headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if(photo.isMain && this.user && this.member){
          this.user.url = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
        }
      }
    }

  }

  updateMainPhoto(photo:Photo){
    this.memberService.updateMainPhotoOfMember(photo).subscribe({
      next: () =>{
        if(this.user && this.member){
          this.user.url = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl=photo.url;
          this.member.photos.forEach(p =>{
            if(p.isMain) p.isMain=false;
            if(p.id === photo.id) p.isMain=true;
          })
        }
      }
    })
  }

  deletePhoto(photoId:number){
    this.memberService.deletePhoto(photoId).subscribe({
      next:() =>{
        if(this.member){
          this.member.photos = this.member.photos.filter(p => p.id!=photoId);
        }
      }
    })
  }

}
