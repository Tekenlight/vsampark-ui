import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule, 
              OtpRoutingModule,
              FormsModule,
              PageHeaderModule
            ],
    declarations: [OtpComponent]
})
export class OtpModule {}
