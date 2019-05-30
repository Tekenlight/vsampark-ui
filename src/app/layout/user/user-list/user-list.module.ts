import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { PageHeaderModule } from '../../../shared';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyLinkageDialogComponent } from '../company-linkage-dialog/company-linkage-dialog.component';

@NgModule({
  declarations: [UserListComponent,CompanyLinkageDialogComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    PageHeaderModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents:[CompanyLinkageDialogComponent]
})
export class UserListModule { }

