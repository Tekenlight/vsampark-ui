import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { PageHeaderModule } from '../../../shared';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    PageHeaderModule,
    TableModule,
  ]
})
export class UserListModule { }

