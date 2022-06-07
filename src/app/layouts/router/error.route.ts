import { ErrorComponent } from '../error/error.component';
import { Routes } from '@angular/router';


export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
      errorMessage: 'You are not authorized to access this page.',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
      errorMessage: 'The page does not exist.',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
