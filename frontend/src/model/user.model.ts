export interface IUser {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    gender: string;
    birthdate: Date;
    password: string;
}

export enum Gender {
    male = 0,
    female,
    other
}