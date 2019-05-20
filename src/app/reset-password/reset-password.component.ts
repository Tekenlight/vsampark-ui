import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { MustMatch } from '../common/validator/must-match.validator';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  password:string;
  new_password:string;
  user_id:string;
  response_received:any;
  has_error:boolean=false;
  error_message:string;
  constructor(private formBuilder: FormBuilder,private router: Router,private userService:UserService, 
              private activatedRoute: ActivatedRoute) { }

  get form_controls(){
    return this.resetPasswordForm.controls;
  }
  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password : ['', [Validators.email,Validators.required]],
      new_password : ['', [Validators.required]],
      confirm_password : ['', [Validators.required]],
    },{
      //validator: MustMatch('new_password', 'confirm_password') //not calling custom validator, check this
     
  })
  this.activatedRoute.params.subscribe((params:any) => {
    this.user_id=params.id
  })
  }
 change_password(){
  const credentials:any={
     password:this.resetPasswordForm.get('password').value,
     new_password:this.resetPasswordForm.get('new_password').value
  }
   this.userService.reset_password(credentials,this.user_id).subscribe((value:any) => {
    this.response_received=value;
    console.log(this.response_received)
    if(this.response_received.error==false){
      this.router.navigate(['claim-company/', this.user_id ])
    }
    else if(this.response_received.error==true){
      this.has_error=true;
      this.error_message="Invalid Credentials"
    }
 });
 }

 
}
