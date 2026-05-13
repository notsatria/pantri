export function normalizeIngredientName(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function canAddIngredient(existingIngredients, nextValue, maxIngredients = 20) {
  const normalized = normalizeIngredientName(nextValue);

  if (!normalized) {
    return false;
  }

  if (existingIngredients.length >= maxIngredients) {
    return false;
  }

  return !existingIngredients.some(
    (ingredient) => normalizeIngredientName(ingredient) === normalized,
  );
}
