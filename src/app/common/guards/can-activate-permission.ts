import { Authority } from './../enum/authority.constants';
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
    const authorities: string[] = data['authorities'];
    const isLoggedIn = this.authService.isLoggedIn;

    if (!authorities || authorities.length === 0) {
      return true;
    }

    const hasAnyAuthority = this.authService.hasAnyAuthority(authorities);
    if (data['requireLogin']) {

      if (isLoggedIn) {
        if (authorities.find(u => u === Authority.USER)) {
          if (hasAnyAuthority) {
            return true
          }
          this.router.navigate(['/admin/dashboard']);
          return false;
        }
        if (authorities.find(u => u === Authority.ADMIN)) {
          if (hasAnyAuthority) {
            return true
          }
          this.router.navigate(['/user']);
          return false;
        }
      }
      this.router.navigate(['/login']);
      return false
    }
    else {
      if (isLoggedIn) {
        this.router.navigate(['/user']);
        return false
      }
      return true
    }
  }
}