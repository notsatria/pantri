import { describe, expect, it } from "vitest";
import { parseRecipeResponse } from "./recipeResponseParser";

describe("parseRecipeResponse", () => {
  it("parses and normalizes recipe JSON", () => {
    const recipes = parseRecipeResponse(
      JSON.stringify({
        recipes: [
          {
            name: "Ayam Cabai",
            cuisine: "Indonesia",
            duration: "25 menit",
            difficulty: "Sedang",
            ingredients: ["Ayam", "Cabai"],
            steps: ["Tumis bumbu", "Masak ayam"],
            summary: "Ayam pedas cepat.",
          },
        ],
      }),
    );

    expect(recipes[0]).toMatchObject({
      id: "ayam-cabai",
      name: "Ayam Cabai",
      difficulty: "Sedang",
    });
  });

  it("accepts fenced JSON returned by an LLM", () => {
    const recipes = parseRecipeResponse(
      '```json\n{"recipes":[{"name":"Sup Tomat","ingredients":["Tomat"],"steps":["Rebus tomat"]}]}\n```',
    );

    expect(recipes[0].name).toBe("Sup Tomat");
  });

  it("throws when recipes are missing", () => {
    expect(() => parseRecipeResponse('{"recipes":[]}')).toThrow(
      /belum menemukan resep/i,
    );
  });
});
