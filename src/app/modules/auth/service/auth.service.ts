import { StateStorageService } from './../../../common/shared/service/state-storage.service';
import { ApplicationConfigService } from './../../../common/config/application-config.service';
import { User } from '../../../common/models/user-login-model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, shareReplay } from 'rxjs/operators';
import { Observable, ReplaySubject, of, catchError } from 'rxjs';
import { IUser, IUserLoginResponse } from '../../../common/models/user-login-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user?: IUser | null | undefined;
  private authenticationState = new ReplaySubject<User | null | undefined>(1);
  private accountCache$?: Observable<User | null | undefined>;

  private baseUrlFake = environment.baseURlFake;
  private baseUrl = environment.baseURl;

  constructor(private router: Router,
    private httpClient: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private stateStorageService: StateStorageService) {
  }

  public get isLoggedIn(): boolean {
    this.user = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token') || '') : undefined;
    return this.user != null;
  }

  public login(email: string, password: string): Observable<IUserLoginResponse> {
    return this.httpClient.post<IUserLoginResponse>(this.baseUrlFake + 'login', { email, password }).pipe(
      tap((result: IUserLoginResponse) => {
        if (result.status === 'SUCCESS') {
          this.handleLogin(result.user);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.accountCache$ = undefined;
    this.router.navigate(['/login']);
  }

  private handleLogin(user?: IUser): void {
    this.user = user;
    localStorage.setItem('access_token', JSON.stringify(this.user));
    this.authenticationState.next(this.user);
    this.router.navigate(['/']);
  }

  public getAuthenticationState(): Observable<User | null | undefined> {
    return this.authenticationState.asObservable();
  }

  public authenticate(user: User | null | undefined): void {
    this.user = user;
    this.authenticationState.next(this.user);
    if (!user) {
      sessionStorage.clear();
      localStorage.clear();
    }
  }

  public identity(force?: boolean): Observable<User | null | undefined> {
    if (!this.accountCache$ || force || !this.isLoggedIn) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => of(null)),
        tap((account: User | null | undefined) => {
          this.authenticate(account);

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  public hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.user || !this.user.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.user.authorities.some((authority: string) => authorities.includes(authority));
  }

  private fetch(): Observable<User> {
    return this.httpClient.get<User>(this.applicationConfigService.getEndpointFor('api/user'));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      alert(previousUrl)
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}