import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCompanyListRoutingModule } from './user-company-list-routing.module';
import { UserCompanyListComponent } from './user-company-list.component';
import { PageHeaderModule } from '../../shared';
import { TableModule } from 'primeng/table';
import { DialogModule, Dialog} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserCompanyListComponent],
  imports: [
    CommonModule,
    UserCompanyListRoutingModule,
    PageHeaderModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class UserCompanyListModule { }







