import { Schema, model, Document } from "mongoose";
const {
  Types: { ObjectId },
} = Schema;

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

// Schema for Company
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
