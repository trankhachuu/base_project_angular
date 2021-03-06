import { Authority } from './common/enum/authority.constants';
import { errorRoute } from './layouts/router/error.route';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatePermission } from './common/guards/can-activate-permission';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth-routing/auth.module').then(m => m.AuthModule),
    data: {
      requireLogin: false,
      authorities : ['']
    },
    canActivate: [CanActivatePermission]
  },
  {
    path: '',
    loadChildren: () => import('./layouts/layout-module/auth-layout.module').then(m => m.AuthLayoutModule),
    data: {
      requireLogin: true,
      authorities : [Authority.USER]
    },
    canActivate: [CanActivatePermission]
  },
  {
    path: '',
    loadChildren: () => import('./layouts/addmin-layout-module/admin-layout.module').then(m => m.AddminLayoutModule),
    data: {
      requireLogin: true,
      authorities : [Authority.ADMIN]
    },
    canActivate: [CanActivatePermission]
  },
  ...errorRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
