import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  createdAt: Date;
}
const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
