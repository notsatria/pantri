import { describe, expect, it } from "vitest";
import { getRecipeProviderMode, searchRecipes } from "./recipeSearch";

describe("getRecipeProviderMode", () => {
  it("uses mock mode without a Groq key", () => {
    expect(getRecipeProviderMode({})).toBe("mock");
  });

  it("uses groq mode when a Groq key exists", () => {
    expect(getRecipeProviderMode({ VITE_GROQ_API_KEY: "key" })).toBe("groq");
  });
});

describe("searchRecipes", () => {
  it("falls back to mock recipes when no Groq key exists", async () => {
    const recipes = await searchRecipes({
      cuisine: "Indonesia",
      ingredients: ["ayam"],
      env: {},
    });

    expect(recipes[0].name).toBe("Ayam Geprek Rumahan");
  });
});
