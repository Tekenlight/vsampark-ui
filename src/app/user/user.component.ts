import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './model/user.model';
import { UserService } from'./services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  message:string;
  submit_button:boolean=false;
  

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router:Router) { 
  this.userForm = this.formBuilder.group({
    user_name : ['',[Validators.required]],
    contact_number : ['', [Validators.required,Validators.maxLength(14)]],
    email_id : ['', [Validators.email,Validators.required]]
  })
}
  ngOnInit() {
  }

  get form_controls(){
    return this.userForm.controls
  }
createUser(){
  const user :User={
    user_name:this.userForm.get('user_name').value,
    contact_number: this.userForm.get('contact_number').value,
    email_id: this.userForm.get('email_id').value
  }
  this.submit_button=true;
  user.contact_number=user.contact_number.toString();
  
  if((user.contact_number.charAt(0)=='+') && (user.contact_number.charAt(1)=='9') && (user.contact_number.charAt(9)=='1')){
   user.contact_number=user.contact_number.substr(1)
    console.log(user.contact_number)
  }
 
  this.userService.createUser(user);
  this.message= "Registered successfully, Please check your mail "+ user.email_id +" for Login Credentials";
  //this.router.navigate(['success'])
}


}

