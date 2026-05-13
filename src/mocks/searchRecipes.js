import { mockRecipes } from "./recipes";

function hasMatchingCuisine(recipeCuisine, selectedCuisine) {
  return selectedCuisine === "Semua" || recipeCuisine === selectedCuisine;
}

function hasMatchingIngredient(recipeIngredients, selectedIngredients) {
  if (!selectedIngredients.length) {
    return true;
  }

  const normalizedRecipeIngredients = recipeIngredients.map((ingredient) =>
    ingredient.toLowerCase(),
  );

  return selectedIngredients.some((ingredient) =>
    normalizedRecipeIngredients.some((recipeIngredient) =>
      recipeIngredient.includes(ingredient.toLowerCase()),
    ),
  );
}

export async function searchRecipes({
  cuisine,
  ingredients,
  shouldFail = false,
  delay = 900,
}) {
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (shouldFail) {
    throw new Error("Pantri lagi kesulitan menyusun menu. Coba lagi sebentar ya.");
  }

  const filteredRecipes = mockRecipes.filter(
    (recipe) =>
      hasMatchingCuisine(recipe.cuisine, cuisine) &&
      hasMatchingIngredient(recipe.ingredients, ingredients),
  );

  return filteredRecipes.slice(0, 5);
}
