import { Request } from "express";

interface IUser{
    id: string,
    username: string,
    role: string
}

export interface ILoginRequest extends Request{
    user?: IUser
}