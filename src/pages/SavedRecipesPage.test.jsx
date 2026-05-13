import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { SavedRecipesPage } from "./SavedRecipesPage";
import { SAVED_RECIPES_KEY } from "../utils/localStorage";

const savedRecipe = {
  id: "ayam-geprek-rumahan",
  name: "Ayam Geprek Rumahan",
  cuisine: "Indonesia",
  duration: "30 menit",
  difficulty: "Mudah",
  ingredients: ["Ayam", "Cabai"],
  steps: ["Goreng ayam", "Geprek dengan sambal"],
  summary: "Ayam geprek cepat.",
  tips: "Sajikan hangat.",
  savedAt: "2026-05-13T08:00:00.000Z",
};

function renderSavedPage() {
  return render(
    <MemoryRouter>
      <SavedRecipesPage />
    </MemoryRouter>,
  );
}

describe("SavedRecipesPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows an empty state when no recipes are saved", () => {
    renderSavedPage();

    expect(screen.getByText(/belum ada resep tersimpan/i)).toBeInTheDocument();
  });

  it("renders saved recipes from localStorage", () => {
    window.localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify([savedRecipe]));
    renderSavedPage();

    expect(screen.getByText(/Ayam Geprek Rumahan/i)).toBeInTheDocument();
  });

  it("removes a saved recipe", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify([savedRecipe]));
    renderSavedPage();

    await user.click(screen.getByRole("button", { name: /hapus resep/i }));

    expect(screen.queryByText(/Ayam Geprek Rumahan/i)).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(SAVED_RECIPES_KEY))).toEqual([]);
  });
});
