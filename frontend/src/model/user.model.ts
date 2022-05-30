export interface IUser {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    password: string;
}

export enum Gender {
    male = 0,
    female,
    other
}