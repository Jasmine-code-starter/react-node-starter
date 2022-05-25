export interface IUser {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
}

export enum Gender {
    male = 0,
    female,
    other
}