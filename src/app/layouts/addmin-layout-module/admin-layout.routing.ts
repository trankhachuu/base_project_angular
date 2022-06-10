import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'admin/dashboard',
        loadChildren: () => import('../../modules/dashboard/modules/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'admin',
        component: AdminLayoutComponent
    }
];
