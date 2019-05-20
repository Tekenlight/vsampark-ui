import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyApproveRejectRoutingModule } from './company-approve-reject-routing.module';
import { CompanyApproveRejectComponent } from './company-approve-reject.component';
import { PageHeaderModule } from '../../../shared';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [CompanyApproveRejectComponent ],
  imports: [
    CommonModule,
    CompanyApproveRejectRoutingModule,
    PageHeaderModule,
    TableModule,
  ]
})
export class CompanyApproveRejectModule { }