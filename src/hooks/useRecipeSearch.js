import { useState } from "react";
import { searchRecipes as defaultSearchRecipes } from "../mocks/searchRecipes";

const initialState = {
  status: "idle",
  recipes: [],
  errorMessage: null,
};

export function useRecipeSearch(searchRecipes = defaultSearchRecipes) {
  const [status, setStatus] = useState(initialState.status);
  const [recipes, setRecipes] = useState(initialState.recipes);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  async function search({ cuisine, ingredients, shouldFail = false }) {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const nextRecipes = await searchRecipes({
        cuisine,
        ingredients,
        shouldFail,
      });

      setRecipes(nextRecipes);
      setStatus("success");
      return nextRecipes;
    } catch (error) {
      setRecipes([]);
      setStatus("error");
      setErrorMessage(error.message);
      return [];
    }
  }

  return { status, recipes, errorMessage, search };
}
