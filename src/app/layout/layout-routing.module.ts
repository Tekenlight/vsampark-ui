import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'layout', redirectTo: 'blank-page', pathMatch: 'prefix' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'companies', loadChildren: './company/company-list/company-list.module#CompanyListModule' },
            { path: 'claim-company/:id', loadChildren: './claim-company/claim-company.module#ClaimCompanyModule' },
            { path: 'generate-otp', loadChildren: './generate-otp/otp.module#OtpModule' },
            { path: 'company/registration', loadChildren: './company/company-create/company-create.module#CompanyCreateModule' },
            { path: 'companies/approve-reject', loadChildren: './company/company-approve-reject/company-approve-reject.module#CompanyApproveRejectModule' },
            { path: 'company/edit/:id', loadChildren: './company/company-create/company-create.module#CompanyCreateModule' },
            { path: 'company-detail-view/:id', loadChildren: './company/company-detail-view-page/company-detail-view-page.module#CompanyDetailViewPageModule' },
            { path: 'users', loadChildren: './user/user-list/user-list.module#UserListModule' },
            { path: 'admin-user-creation', loadChildren: './user/admin-user-creation/admin-user-creation.module#AdminUserCreationModule' },
            { path: 'user/edit/:id', loadChildren: './user/admin-user-creation/admin-user-creation.module#AdminUserCreationModule' },
            { path: 'user-company-linkages', loadChildren: './user-company-list/user-company-list.module#UserCompanyListModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
