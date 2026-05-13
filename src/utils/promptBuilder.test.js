import { describe, expect, it } from "vitest";
import { buildRecipePrompt } from "./promptBuilder";

describe("buildRecipePrompt", () => {
  it("builds system and user messages for Groq", () => {
    const messages = buildRecipePrompt({
      cuisine: "Indonesia",
      ingredients: ["ayam", "cabai"],
    });

    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe("system");
    expect(messages[0].content).toContain("masakan Indonesia");
    expect(messages[1].content).toContain("ayam, cabai");
    expect(messages[1].content).toContain("\"recipes\"");
  });
});
