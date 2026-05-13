import { useState } from "react";
import {
  readJsonFromStorage,
  SAVED_RECIPES_KEY,
  writeJsonToStorage,
} from "../utils/localStorage";

const MAX_SAVED_RECIPES = 50;

function loadSavedRecipes() {
  const savedRecipes = readJsonFromStorage(SAVED_RECIPES_KEY, []);
  return Array.isArray(savedRecipes) ? savedRecipes : [];
}

function persistSavedRecipes(nextRecipes) {
  writeJsonToStorage(SAVED_RECIPES_KEY, nextRecipes);
  return nextRecipes;
}

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(loadSavedRecipes);
  const [statusMessage, setStatusMessage] = useState(null);

  function isRecipeSaved(recipeId) {
    return savedRecipes.some((recipe) => recipe.id === recipeId);
  }

  function saveRecipe(recipe) {
    let didSave = false;

    setSavedRecipes((currentRecipes) => {
      if (currentRecipes.some((savedRecipe) => savedRecipe.id === recipe.id)) {
        setStatusMessage("Resep ini sudah tersimpan.");
        return currentRecipes;
      }

      if (currentRecipes.length >= MAX_SAVED_RECIPES) {
        setStatusMessage("Koleksi resep penuh. Hapus beberapa resep dulu.");
        return currentRecipes;
      }

      const recipeToSave = {
        ...recipe,
        savedAt: new Date().toISOString(),
      };
      didSave = true;
      setStatusMessage("Resep berhasil disimpan.");
      return persistSavedRecipes([recipeToSave, ...currentRecipes]);
    });

    return didSave;
  }

  function removeRecipe(recipeId) {
    const nextRecipes = persistSavedRecipes(
      savedRecipes.filter((recipe) => recipe.id !== recipeId),
    );
    setSavedRecipes(nextRecipes);
    setStatusMessage("Resep dihapus dari koleksi.");
  }

  function clearSavedRecipes() {
    persistSavedRecipes([]);
    setSavedRecipes([]);
    setStatusMessage("Semua resep tersimpan sudah dihapus.");
  }

  return {
    savedRecipes,
    statusMessage,
    saveRecipe,
    removeRecipe,
    clearSavedRecipes,
    isRecipeSaved,
  };
}
