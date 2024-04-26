import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  private baseUrl = "https://localhost:7015/api/Buggy/";

  constructor(private http:HttpClient){}

  get404Error(){
    this.http.get(this.baseUrl + "not-found").subscribe({
      error : err=>{
        console.log(err);
      }
    })
  }
}
