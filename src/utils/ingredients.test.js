import { describe, expect, it } from "vitest";
import { canAddIngredient, normalizeIngredientName } from "./ingredients";

describe("normalizeIngredientName", () => {
  it("trims and lowers input for duplicate comparisons", () => {
    expect(normalizeIngredientName("  Bawang Putih ")).toBe("bawang putih");
  });
});

describe("canAddIngredient", () => {
  it("rejects duplicates", () => {
    expect(canAddIngredient(["ayam"], "Ayam")).toBe(false);
  });

  it("rejects empty values", () => {
    expect(canAddIngredient([], "   ")).toBe(false);
  });

  it("rejects input when the ingredient limit is reached", () => {
    expect(canAddIngredient(Array.from({ length: 20 }, () => "item"), "baru")).toBe(
      false,
    );
  });

  it("accepts unique values below the limit", () => {
    expect(canAddIngredient(["ayam"], "Cabai")).toBe(true);
  });
});
