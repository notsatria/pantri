import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRecipeSearch } from "./useRecipeSearch";

describe("useRecipeSearch", () => {
  it("returns recipes after a successful mock search", async () => {
    const searchRecipes = vi.fn().mockResolvedValue([
      {
        id: "mock-1",
        name: "Resep Mock",
      },
    ]);

    const { result } = renderHook(() => useRecipeSearch(searchRecipes));

    await act(async () => {
      await result.current.search({
        cuisine: "Indonesia",
        ingredients: ["ayam", "cabai"],
      });
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.recipes).toHaveLength(1);
    expect(result.current.errorMessage).toBeNull();
  });

  it("exposes an error message when the search fails", async () => {
    const searchRecipes = vi.fn().mockRejectedValue(new Error("mock failed"));
    const { result } = renderHook(() => useRecipeSearch(searchRecipes));

    await act(async () => {
      await result.current.search({
        cuisine: "Indonesia",
        ingredients: ["ayam"],
      });
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.recipes).toEqual([]);
    expect(result.current.errorMessage).toBe("mock failed");
  });
});
