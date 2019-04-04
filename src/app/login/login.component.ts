import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private userService:UserService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email_id : ['', [Validators.email,Validators.required]],
      password : ['', Validators.required],
    })
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.user_name = params['user_name'];
        this.contact_number = params['contact_number'];
        this.email_id = params['email_id'];
        this.password = params['password'];


    });
   
   }

  ngOnInit() {
  }
 login():any{
   let data
  const login:any={
    email_id: this.loginForm.get('email_id').value,
    password:this.loginForm.get('password').value,
    contact_number: this.contact_number,
    user_name: this.user_name
  }
 // if((login.password==this.password)&&(login.email_id==this.email_id)){
    this.userService.saveUser(login);
//   let res = this.userService.saveUser(login).subscribe(value => {
//     data=value;
//     console.log("Response Subscription ",data);
//  });
 // console.log("Response ", res);
  this.router.navigateByUrl("/companies/registration",)

  // }
  // else{
  //   alert("Invalid Credentials")
  // }
 }

}




