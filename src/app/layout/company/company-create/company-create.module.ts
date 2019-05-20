import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCreateComponent } from './company-create.component';
import { PageHeaderModule } from '../../../shared';
import { CompanyCreateRoutingModule } from './company-create-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  declarations: [CompanyCreateComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    CompanyCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MyDatePickerModule,
  ]
})
export class CompanyCreateModule { }
