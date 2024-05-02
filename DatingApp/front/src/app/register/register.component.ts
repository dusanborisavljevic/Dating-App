import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../_validators/text-input/text-input.component';
import { DateInputComponent } from '../_validators/date-input/date-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,TextInputComponent,DateInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() emitRegisterCancel = new EventEmitter();
  registerForm:FormGroup = new FormGroup({});
  maxDate = new Date();
  constructor(private accountService:AccountService,private toastrService:ToastrService,private fb:FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      confirmPassword: ['',[Validators.required,this.customValidator('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    })
  }

  customValidator(matchTo:string):ValidatorFn{
    return(control:AbstractControl) =>{
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching:true}
    }
  }

 register(){
  console.log(this.registerForm.value)
 
  
 }

 cancel(){
  this.emitRegisterCancel.emit(true);
 }

  
}
