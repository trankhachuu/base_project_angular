import { AdminLayoutRoutes } from './admin-layout.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    declarations: [
    AdminLayoutComponent
  ]
})
export class AddminLayoutModule { }
