import { Routes } from '@angular/router';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'auth/login',
        loadChildren: () => import('../../modules/auth/auth-routing/auth.module').then(m => m.AuthModule),
    },
];
