import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './model/user.model';
import { UserService } from'./services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  user: User
  constructor(private formBuilder: FormBuilder,private userService: UserService) { 
  this.userForm = this.formBuilder.group({
    user_name : ['',[Validators.required]],
    contact_number : ['', [Validators.required,Validators.maxLength(12)]],
    email_id : ['', [Validators.email,Validators.required]]
  })
}
  ngOnInit() {
  }
createUser(){
  const user :User={
    user_name:this.userForm.get('user_name').value,
    contact_number: this.userForm.get('contact_number').value,
    email_id: this.userForm.get('email_id').value
  }
  this.userService.createUser(user);
}

}

