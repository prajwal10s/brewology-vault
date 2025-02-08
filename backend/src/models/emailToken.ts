import { Schema, model, Document } from "mongoose";
interface emailToken extends Document {
  user: Schema.Types.ObjectId;
  token: String;
}
const emailTokenSchema = new Schema<emailToken>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
});

export const emailTokenModel = model<emailToken>("Recipe", emailTokenSchema);
