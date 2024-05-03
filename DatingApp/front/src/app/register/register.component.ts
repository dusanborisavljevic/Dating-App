import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../_validators/text-input/text-input.component';
import { DateInputComponent } from '../_validators/date-input/date-input.component';
import { Router } from '@angular/router';

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
  constructor(private accountService:AccountService,private toastrService:ToastrService,private fb:FormBuilder,private router:Router){}

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
      password1: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      confirmPassword: ['',[Validators.required,this.customValidator('password1')]]
    });

    this.registerForm.controls['password1'].valueChanges.subscribe({
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
  //console.log(this.registerForm.value)
  let dateofbirth = this.registerForm.controls['dateOfBirth'].value
  let newDate = this.getDateOnly(dateofbirth);
  const values = {...this.registerForm.value, dateOfBirth:newDate}
 // console.log(values)
  this.accountService.register(values).subscribe({
    next: response =>{
      this.toastrService.success("Successfully registration!")
      this.router.navigateByUrl("members");
    }
  })
 }

 private getDateOnly(dateString:string){
  let datePomocni = new Date(dateString)
  return new Date(datePomocni.setMinutes(datePomocni.getMinutes()-datePomocni.getTimezoneOffset())).toISOString().slice(0,10);
 }

 cancel(){
  this.emitRegisterCancel.emit(true);
 }

  
}
