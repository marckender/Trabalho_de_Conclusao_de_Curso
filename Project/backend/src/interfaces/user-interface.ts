export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILogin {
  email: string;
  password: string;
}