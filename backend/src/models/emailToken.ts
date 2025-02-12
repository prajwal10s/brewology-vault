import { Schema, model, Document } from "mongoose";
interface emailToken extends Document {
  userName: String;
  token: String;
}
const emailTokenSchema = new Schema<emailToken>({
  userName: { type: String, required: true },
  token: { type: String, required: true },
});

export const emailTokenModel = model<emailToken>(
  "emailToken",
  emailTokenSchema
);
