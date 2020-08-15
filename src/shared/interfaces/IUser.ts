export interface IUserBase {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  email: string;
  userId: string;
  token: string;
}
