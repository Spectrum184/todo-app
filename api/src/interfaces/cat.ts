export enum SexEnum {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

export interface ICat {
    name: string;
    age?: number;
    color?: string;
    sex: SexEnum;
}