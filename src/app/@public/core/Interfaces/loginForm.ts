import { IUser } from './user';
export interface ILogin {
    email: String,
    password: any
}

export interface IResultLogin {
    status: boolean;
    message: string;
    token?: string;
    user?: IUser;
}