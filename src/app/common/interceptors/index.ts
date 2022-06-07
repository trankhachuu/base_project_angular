import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendInterceptor } from './backend.interceptor';

import { HeaderInterceptor } from './header.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
];