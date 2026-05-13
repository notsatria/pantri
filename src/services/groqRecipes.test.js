import { describe, expect, it, vi } from "vitest";
import { GROQ_CHAT_COMPLETIONS_URL, searchGroqRecipes } from "./groqRecipes";

describe("searchGroqRecipes", () => {
  it("posts a structured JSON request to Groq", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                recipes: [
                  {
                    name: "Ayam Cabai",
                    ingredients: ["Ayam", "Cabai"],
                    steps: ["Masak ayam"],
                  },
                ],
              }),
            },
          },
        ],
      }),
    });

    const recipes = await searchGroqRecipes({
      cuisine: "Indonesia",
      ingredients: ["ayam", "cabai"],
      apiKey: "test-key",
      fetcher,
    });

    expect(fetcher).toHaveBeenCalledWith(
      GROQ_CHAT_COMPLETIONS_URL,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-key",
        }),
      }),
    );
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject({
      response_format: { type: "json_object" },
      model: "llama-3.3-70b-versatile",
    });
    expect(recipes[0].name).toBe("Ayam Cabai");
  });

  it("throws a config error when the key is missing", async () => {
    await expect(
      searchGroqRecipes({
        cuisine: "Indonesia",
        ingredients: ["ayam"],
        apiKey: "",
      }),
    ).rejects.toThrow(/api key belum diatur/i);
  });

  it("throws a helpful message for invalid keys", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    await expect(
      searchGroqRecipes({
        cuisine: "Indonesia",
        ingredients: ["ayam"],
        apiKey: "bad-key",
        fetcher,
      }),
    ).rejects.toThrow(/tidak valid/i);
  });
});
