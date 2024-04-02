import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'front';
  users:any;
  
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get("https://localhost:7015/api/Users").subscribe({
      next:response => this.users=response,
      error:error => console.log(error),
      complete:() => console.log("Request has completed")
    })
  }



}
