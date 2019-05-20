import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user_name: string;
  contact_number: string; 
  email_id:string;
  password:string;
  user_id:any;
  navigationExtras: NavigationExtras 
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private userService:UserService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email_id : ['', [Validators.email,Validators.required]],
      password : ['', Validators.required],
    })
    
    this.route.queryParams.subscribe(params => {
        this.user_name = params['username'];
        this.contact_number = params['contact_number'];
        this.email_id = params['email_id'];
        this.password = params['password'];


    });
   
   }

  ngOnInit() {
  }
 login():any{
 
    const login:any={
      email_id: this.loginForm.get('email_id').value,
      password:this.loginForm.get('password').value,
      contact_number: this.contact_number, // required by backend
      user_name: this.user_name // required by backend
    }
 
    this.userService.login(login).subscribe((response:any) => {
      this.user_id=response.UserObject._id;
      console.log("Response Received",response, this.user_id)
      if(response.UserObject.user_status=="Confirmed"){
        this.router.navigate(['claim-company/',this.user_id]); 
      }
      else{
        this.router.navigate(['change-password/',this.user_id])
      }
   });
 
  // if((login.password==this.password)&&(login.email_id==this.email_id)){
  //   this.router.navigate(['claim-company']);
  // }
 }

}




