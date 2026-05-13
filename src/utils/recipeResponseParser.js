function stripMarkdownFence(value) {
  return value
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

function toKebabCase(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRecipe(recipe, index) {
  const name = String(recipe.name || `Resep ${index + 1}`).trim();
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map(String).filter(Boolean)
    : [];
  const steps = Array.isArray(recipe.steps)
    ? recipe.steps.map(String).filter(Boolean).slice(0, 7)
    : [];

  return {
    id: String(recipe.id || toKebabCase(name) || `recipe-${index + 1}`),
    name,
    cuisine: String(recipe.cuisine || "Indonesia"),
    duration: String(recipe.duration || "30 menit"),
    difficulty: ["Mudah", "Sedang", "Sulit"].includes(recipe.difficulty)
      ? recipe.difficulty
      : "Mudah",
    ingredients,
    steps,
    tips: recipe.tips ? String(recipe.tips) : "",
    summary: String(recipe.summary || "Ide resep dari bahan yang tersedia."),
  };
}

export function parseRecipeResponse(content) {
  const parsed = JSON.parse(stripMarkdownFence(content));
  const recipes = Array.isArray(parsed.recipes) ? parsed.recipes : [];

  if (!recipes.length) {
    throw new Error("Pantri belum menemukan resep yang cocok dari respons AI.");
  }

  return recipes.map(normalizeRecipe).slice(0, 5);
}
