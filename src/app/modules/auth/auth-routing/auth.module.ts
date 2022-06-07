import { LoginFormComponent } from './../components/login-form/login-form.component';
import { LoginComponent } from './../components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { SharedModule } from 'src/app/common/shared/shared-module/shared-module.module';



@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers : [AuthService]
})
export class AuthModule { }
