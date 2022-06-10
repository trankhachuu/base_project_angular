import { TypeResponse } from './../enum/type-reposone';
import { environment } from 'src/environments/environment';
import { ApplicationConfigService } from './../config/application-config.service';
import { User } from './../models/user-login-model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  usersData,
} from 'src/app/common/data/fake-back-end';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { TypeHttpMethod } from '../enum/type-http-method';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  private usersData = usersData;

  constructor(private applicationConfigService: ApplicationConfigService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method } = request;
    let newHttpResponse = new Observable<HttpResponse<any>>();
    const typeResponse = url.split('/');
    if (typeResponse[2] === environment.currentURL){
      switch (true) {
        case method === TypeHttpMethod.GET && url === this.applicationConfigService.getEndpointFor('users'):
          newHttpResponse = of(
            new HttpResponse({ status: 200, body: { status: TypeResponse.Success, users: [...usersData] }})
          ).pipe(delay(500));
          break;
        case method === TypeHttpMethod.POST && url === this.applicationConfigService.getEndpointFor('user'):
          newHttpResponse = this.addUser(request);
          break;
        case method === TypeHttpMethod.PUT && url === this.applicationConfigService.getEndpointFor('user'):
          newHttpResponse = this.editUser(request);
          break;
        case method === TypeHttpMethod.GET && url.match(/\/user\/\d+$/) != null:
          newHttpResponse = this.getUserById(request);
          break;
        case method === TypeHttpMethod.DELETE && url.match(/\/user\/\d+$/) != null:
          newHttpResponse = this.deletetUser(request);
          break;
        case method === TypeHttpMethod.POST && url === this.applicationConfigService.getEndpointFor('login'):
          newHttpResponse = this.login(request);
          break;
        case method === TypeHttpMethod.GET && url === this.applicationConfigService.getEndpointFor('user'):
            newHttpResponse = this.getUser();
            break;
        default:
          break;
      }
    }
    return newHttpResponse || next.handle(request);

  }

  private login(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const email = request.body.email;
    const password = request.body.password;

    const user = this.usersData.find((resultUser) => {
      return resultUser.email === email && resultUser.password === password;
    });

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success, user: {...user}, token: user.accessToken } })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: TypeResponse.Error,
            message: 'user name or password incorrect',
          },
        })
      ).pipe(delay(500));
    }
  }

  private getUser(): Observable<HttpResponse<any>> {
    const user: User = JSON.parse(localStorage.getItem('access_token') as string) as User;

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success, user: {...user}, token: user.accessToken } })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: TypeResponse.Error,
            message: 'user incorrect',
          },
        })
      ).pipe(delay(500));
    }
  }

  private addUser(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const user = request.body.user;
    user.uid = this.getRandomInt(10000);
    this.usersData.push(user);

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success, user: {...user}} })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            status: TypeResponse.Error,
            message: 'Bad Request',
          },
        })
      ).pipe(delay(500));
    }
  }

  private editUser(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const userData = request.body.user;

    let user = this.usersData.find((resultUser) => {
      return resultUser.uid === userData.uid;
    });

    if (user) {

      user.accessToken = userData.accessToken;
      user.email = userData.email;
      user.imgURL = userData.imgURL;
      user.name = userData.name;
      user.password = userData.password;
      user.authorities = userData.authorities;

      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success, user: {...user}} })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            status: TypeResponse.Error,
            message: 'Bad Request',
          },
        })
      ).pipe(delay(500));
    }
  }

  private getUserById(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const uid = this.getIdParameterFromURL(request.url);

    let user = this.usersData.find((resultUser) => {
      return resultUser.uid === uid;
    });

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success, user: {...user}} })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            status: TypeResponse.Error,
            message: 'Bad Request',
          },
        })
      ).pipe(delay(500));
    }
  }

  private deletetUser(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const uid = this.getIdParameterFromURL(request.url);

    let indexUser = this.usersData.findIndex((resultUser) => {
      return resultUser.uid === uid;
    });

    this.usersData.splice(indexUser, 1)

    if (indexUser >=0) {
      return of(
        new HttpResponse({ status: 200, body: { status: TypeResponse.Success } })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            status: TypeResponse.Error,
            message: 'Bad Request',
          },
        })
      ).pipe(delay(500));
    }
  }

  private getIdParameterFromURL(url: string, position: number = -1): string {
    const urlParts = url.split('/');
    if (position  === -1){
      return urlParts[urlParts.length - 1];
    }
    else{
      return urlParts[position];
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}