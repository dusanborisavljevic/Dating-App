import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule,NgxGalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  member:Member | undefined;
  galleryOptions:NgxGalleryOptions[] = [];
  galleryImages:NgxGalleryImage[] = [];

  constructor(private memberService:MembersService,private router:ActivatedRoute){}

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width:'500px',
        height: '500px',
        imagePercent: 100,
        preview:false
      }
    ]

    
  }

  getImages(){
    if(!this.member)return [];
    const galleryImagePom= [];
    for(const photo of this.member.photos){
      galleryImagePom.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      })
    }
    return galleryImagePom;
  }

  loadMember(){
    const username = this.router.snapshot.paramMap.get('username');
    if(!username)return;
    this.memberService.getMemberMyUserName(username).subscribe({
      next: response => {
        this.member = response;
        this.galleryImages = this.getImages();
      }
    })
  }
}
