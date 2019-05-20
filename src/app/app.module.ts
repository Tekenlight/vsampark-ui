import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

//import { CompanyComponent } from './company/company.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import { PicklistService } from './common/services/picklist.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ClaimCompanyComponent } from './claim-company/claim-company.component';
import { OtpComponent } from './otp/otp.component';
import { DataStorage } from './common/dataProvider/dataProvider';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MessageFormatter } from './common/message-handler/message-handler';
import { ErrorService } from './common/services/errorService';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CompanyViewComponent } from './layout/company/company-view/company-view.component';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
//import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
//import { AppEffects } from './store/effects/app.effects';
import * as companyReducer from './store/company/reducers/company.reducer';
import { CompanyEffects } from './store/company/effects/company.effects';
import * as  userReducer  from './store/user/reducers/user.reducer';
import { UserEffects } from './store/user/effects/user.effects';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const reducers: ActionReducerMap<any> = {
    companies: companyReducer.reducer,
    users: userReducer.reducer
  };



@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        SlimLoadingBarModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        TableModule,
        FormsModule,
        ShowHidePasswordModule,
        AngularFontAwesomeModule,
        FlexLayoutModule,
        MenuModule,
        LanguageTranslationModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([CompanyEffects,UserEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        InternationalPhoneNumberModule,
        NgxIntlTelInputModule,
    ],
    declarations: [
        AppComponent, 
        LandingPageComponent,
        UserComponent,
        SuccessComponent,
        //ClaimCompanyComponent,
        OtpComponent,
        CompanyViewComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        
    ],
    providers: [AuthGuard,PicklistService,DataStorage,MessageFormatter,ErrorService],
    bootstrap: [AppComponent],
    entryComponents:[CompanyViewComponent]
})
export class AppModule {}
