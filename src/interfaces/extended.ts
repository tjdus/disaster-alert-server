import { Document } from "mongoose";

export interface IUserInfo {
  name: string;
  username: string;
  email: string;
  phone_number: string;
}

export interface IUserUpdate {
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

export interface IPasswordUpdate {
  password: string;
  newPassword: string;
}
