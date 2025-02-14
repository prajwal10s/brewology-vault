import { Hash } from "crypto";
import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  userName: String;
  password: String;
  email: String;
  role: "admin" | "user";
  createdAt: Date;
  isActive: boolean;
}
const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
