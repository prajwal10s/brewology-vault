import { Schema, model, Document } from "mongoose";
interface recipeInterface extends Document {
  //maybe hardcode equipments that needs to included to simplify
  hot: boolean;
  milk_based: boolean;
  equipment: String;
  beans?: String;
  roast?: "light" | "medium" | "medium dark" | "dark";
  grind: "very coarse" | "coarse" | "fine" | "very fine";
  grind_specs: String;
  recipe: String;
  owner: Schema.Types.ObjectId;
}
const recipeSchema = new Schema<recipeInterface>({
  hot: { type: Boolean, required: true },
  milk_based: { type: Boolean, required: true },
  equipment: { type: String, required: true },
  beans: String,
  roast: String,
  grind: { type: String, required: true },
  grind_specs: { type: String, required: true },
  recipe: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export const Recipe = model<recipeInterface>("Recipe", recipeSchema);
