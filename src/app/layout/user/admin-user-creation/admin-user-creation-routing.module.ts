import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserCreationComponent } from './admin-user-creation.component';

const routes: Routes = [
  {
      path: '',
      component:AdminUserCreationComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserCreationRoutingModule { }
