import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CompanyApproveRejectComponent } from './company-approve-reject.component';

const routes: Routes = [
  {
      path: '',
      component: CompanyApproveRejectComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyApproveRejectRoutingModule { }
