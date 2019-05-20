import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserCreationRoutingModule } from './admin-user-creation-routing.module';
import { AdminUserCreationComponent } from './admin-user-creation.component';
import { UserService } from '../services/user.service';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [AdminUserCreationComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    AdminUserCreationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InternationalPhoneNumberModule
  ],
  //providers:[UserService]
})
export class AdminUserCreationModule { }
