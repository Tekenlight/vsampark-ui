import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimCompanyComponent } from './claim-company.component';
import { ClaimCompanyRoutingModule } from './claim-company-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClaimCompanyComponent],
  imports: [
    CommonModule,
    ClaimCompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgbModule
    
  ]
})
export class ClaimCompanyModule { }
