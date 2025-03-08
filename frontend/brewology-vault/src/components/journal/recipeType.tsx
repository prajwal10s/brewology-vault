export interface recipePropsType {
  _id: string;
  hot: boolean;
  milk_based: boolean;
  equipment: string;
  beans?: string;
  roast?: "light" | "medium" | "medium dark" | "dark";
  grind: "very coarse" | "coarse" | "fine" | "very fine";
  grind_specs: string;
  recipe: string;
}
