import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CompanyListComponent } from './company-list.component';
import { PageHeaderModule } from '../../../shared';
import { TableModule } from 'primeng/table';
import { UserLinkageDialogComponent } from '../user-linkage-dialog/user-linkage-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CompanyListComponent,UserLinkageDialogComponent ],
  imports: [
    CommonModule,
    CompanyListRoutingModule,
    PageHeaderModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents:[UserLinkageDialogComponent]
  
  
})
export class CompanyListModule { }
