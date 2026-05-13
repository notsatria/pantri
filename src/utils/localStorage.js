export const SAVED_RECIPES_KEY = "pantri_saved_recipes";

export function readJsonFromStorage(key, fallbackValue) {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function writeJsonToStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
