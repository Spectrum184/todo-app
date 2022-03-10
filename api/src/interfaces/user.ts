import { ITask } from "./task";

import { JwtPayload} from "jsonwebtoken"

export enum Role {
    USER = "User",
    ADMIN = "Admin"
}
export interface IUser {
    username: string,
    password: string | null,
    role: Role,
    firstName: string,
    lastName: string,
    email: string,
    telephoneNumber: string,
    tasks?: Array<Omit<ITask, "users">>
}
export interface IDecodedToken extends JwtPayload{
    id: string,
    username: string,
    role: string,
}