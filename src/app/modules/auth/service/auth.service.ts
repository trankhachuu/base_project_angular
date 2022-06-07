import { User } from '../../../common/models/user-login-model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { IUser, IUserLoginResponse } from '../../../common/models/user-login-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public user?: IUser;
    private authenticationState = new ReplaySubject<User | null | undefined>(1);

    private baseUrlFake = environment.baseURlFake;
    private baseUrl = environment.baseURl;

    constructor(private router: Router,
                private httpClient: HttpClient) {
        console.log(localStorage.getItem('access_token'))
    }

    public get isLoggedIn(): boolean {
        this.user = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token') || '') : undefined ;
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
        this.router.navigate(['/auth/login']);
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
}