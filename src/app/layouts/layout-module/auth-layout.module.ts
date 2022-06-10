import { AuthLayoutRoutes } from './auth-layout.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes)
    ],
    declarations: [
    LayoutComponent
  ]
})
export class AuthLayoutModule { }
