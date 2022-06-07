import { ToastrService } from 'ngx-toastr';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './../components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared-module/shared-module.module';


@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [ToastrService]
})
export class DashboardModule { }
