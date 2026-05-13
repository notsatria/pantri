import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSavedRecipes } from "./useSavedRecipes";
import { SAVED_RECIPES_KEY } from "../utils/localStorage";

const recipe = {
  id: "ayam-geprek-rumahan",
  name: "Ayam Geprek Rumahan",
  cuisine: "Indonesia",
  duration: "30 menit",
  difficulty: "Mudah",
  ingredients: ["Ayam", "Cabai"],
  steps: ["Goreng ayam", "Geprek dengan sambal"],
  summary: "Ayam geprek cepat.",
};

describe("useSavedRecipes", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with an empty collection", () => {
    const { result } = renderHook(() => useSavedRecipes());

    expect(result.current.savedRecipes).toEqual([]);
  });

  it("saves a recipe to localStorage", () => {
    const { result } = renderHook(() => useSavedRecipes());

    act(() => {
      result.current.saveRecipe(recipe);
    });

    expect(result.current.savedRecipes).toHaveLength(1);
    expect(result.current.isRecipeSaved(recipe.id)).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(SAVED_RECIPES_KEY))).toHaveLength(1);
  });

  it("prevents duplicate saved recipes", () => {
    const { result } = renderHook(() => useSavedRecipes());

    act(() => {
      result.current.saveRecipe(recipe);
      result.current.saveRecipe(recipe);
    });

    expect(result.current.savedRecipes).toHaveLength(1);
    expect(result.current.statusMessage).toBe("Resep ini sudah tersimpan.");
  });

  it("removes one recipe", () => {
    const { result } = renderHook(() => useSavedRecipes());

    act(() => {
      result.current.saveRecipe(recipe);
      result.current.removeRecipe(recipe.id);
    });

    expect(result.current.savedRecipes).toEqual([]);
    expect(result.current.isRecipeSaved(recipe.id)).toBe(false);
  });

  it("clears all recipes", () => {
    const { result } = renderHook(() => useSavedRecipes());

    act(() => {
      result.current.saveRecipe(recipe);
      result.current.clearSavedRecipes();
    });

    expect(result.current.savedRecipes).toEqual([]);
    expect(JSON.parse(window.localStorage.getItem(SAVED_RECIPES_KEY))).toEqual([]);
  });

  it("stops saving when the collection reaches 50 recipes", () => {
    const fullCollection = Array.from({ length: 50 }, (_, index) => ({
      ...recipe,
      id: `recipe-${index}`,
    }));
    window.localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(fullCollection));
    const { result } = renderHook(() => useSavedRecipes());

    act(() => {
      result.current.saveRecipe({ ...recipe, id: "recipe-51" });
    });

    expect(result.current.savedRecipes).toHaveLength(50);
    expect(result.current.statusMessage).toBe(
      "Koleksi resep penuh. Hapus beberapa resep dulu.",
    );
  });
});
