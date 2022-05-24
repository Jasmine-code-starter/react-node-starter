export interface IUser {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: Date;
}

export enum Gender {
    male = 0,
    female,
    other
}