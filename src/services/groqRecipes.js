import { buildRecipePrompt } from "../utils/promptBuilder";
import { parseRecipeResponse } from "../utils/recipeResponseParser";

export const GROQ_CHAT_COMPLETIONS_URL =
  "https://api.groq.com/openai/v1/chat/completions";

export async function searchGroqRecipes({
  cuisine,
  ingredients,
  apiKey = import.meta.env.VITE_GROQ_API_KEY,
  model = import.meta.env.VITE_GROQ_MODEL || "llama-3.3-70b-versatile",
  fetcher = fetch,
}) {
  if (!apiKey) {
    throw new Error("Groq API key belum diatur. Isi VITE_GROQ_API_KEY di .env.");
  }

  const response = await fetcher(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: buildRecipePrompt({ cuisine, ingredients }),
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_completion_tokens: 1800,
    }),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Groq API key tidak valid. Cek kembali VITE_GROQ_API_KEY."
        : "Groq belum bisa memberi rekomendasi. Coba lagi sebentar.",
    );
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Respons Groq kosong. Coba lagi sebentar.");
  }

  return parseRecipeResponse(content);
}
