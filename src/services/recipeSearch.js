import { searchRecipes as searchMockRecipes } from "../mocks/searchRecipes";
import { searchGroqRecipes } from "./groqRecipes";

export function getRecipeProviderMode(env = import.meta.env) {
  return env.VITE_GROQ_API_KEY ? "groq" : "mock";
}

export async function searchRecipes({
  cuisine,
  ingredients,
  shouldFail = false,
  env = import.meta.env,
}) {
  if (getRecipeProviderMode(env) === "mock") {
    return searchMockRecipes({ cuisine, ingredients, shouldFail });
  }

  return searchGroqRecipes({
    cuisine,
    ingredients,
    apiKey: env.VITE_GROQ_API_KEY,
    model: env.VITE_GROQ_MODEL,
  });
}
