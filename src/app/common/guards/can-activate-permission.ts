import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/service/auth.service';

@Injectable()
export class CanActivatePermission implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const data = route.data;
    const isLoggedIn = this.authService.isLoggedIn;

    if (data['requireLogin']) {
      if (isLoggedIn) {
        return true
      }
      this.router.navigate(['/auth/login']);
      return false
    }
    else {
      if (isLoggedIn) {
        this.router.navigate(['/admin/dashboard']);
        return false
      }
      return true
    }
  }
}