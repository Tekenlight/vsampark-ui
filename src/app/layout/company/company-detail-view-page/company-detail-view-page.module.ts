import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { CompanyDetailViewPageRoutingModule } from './company-detail-view-page-routing.module';
import { CompanyDetailViewPageComponent } from './company-detail-view-page.component';


@NgModule({
  declarations: [CompanyDetailViewPageComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    CompanyDetailViewPageRoutingModule
    
  ]
})
export class CompanyDetailViewPageModule {}
