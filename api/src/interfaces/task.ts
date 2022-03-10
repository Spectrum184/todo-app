import { IUser } from "./user";

export interface ITask {
    title: string,
    deadline: string,
    requirements: Array<ISubTask>,
    users?: Array<Omit<IUser, "password" | "tasks">>
}

export enum Status {
    NOT_STARTED = "NOT STARTED",
    STARTED = "STARTED",
    ROADBLOCK = "ROADBLOCK",
    COMPLETED = "COMPLETED"
}
export interface ISubTask {
    name: string,
    startedAt: string | null,
    completedAt: string | null,
    status: Status,
    user?: Omit<IUser, "password" | "tasks">
}