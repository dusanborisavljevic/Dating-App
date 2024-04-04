import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Output() emitRegisterCancel = new EventEmitter();

  constructor(private accountService:AccountService){}

 registerForm : FormGroup = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
 })

 register(){
  console.log(this.registerForm.value)
  this.accountService.register(this.registerForm.value).subscribe({
    next: response =>{
      this.cancel()
    },
    error: error => console.log(error)
  })
 }

 cancel(){
  console.log("cancel")
  this.emitRegisterCancel.emit(false);
 }

  
}
