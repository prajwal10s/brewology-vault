import { recipePropsType } from "./recipeType";

const RecipeCard: React.FC<{ recipeData: recipePropsType }> = ({
  recipeData,
}) => {
  return (
    <div className="recipeCard">
      <p>{recipeData.beans}</p>
    </div>
  );
};
export default RecipeCard;
