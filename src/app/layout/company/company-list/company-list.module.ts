import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CompanyListComponent } from './company-list.component';
import { PageHeaderModule } from '../../../shared';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [CompanyListComponent ],
  imports: [
    CommonModule,
    CompanyListRoutingModule,
    PageHeaderModule,
    TableModule,
  
  ]
})
export class CompanyListModule { }
