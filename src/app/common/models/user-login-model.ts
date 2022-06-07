
export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserLoginResponse {
    user: IUser;
    status: string;
    message: string;
}

export interface IUser {
    uid: string;
    name: string;
    email: string;
    accessToken: string;
    type: string;
    imgURL: string;
    password: string,
    authorities: string[],
    imageUrl: string | null,
}

export class User implements IUser {
    constructor(
      public uid: string,
      public name: string,
      public email: string,
      public accessToken: string,
      public type: string,
      public imgURL: string,
      public password: string,
      public authorities: string[],
      public imageUrl: string | null,
    ) {}
  }