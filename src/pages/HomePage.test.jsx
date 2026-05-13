import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { SAVED_RECIPES_KEY } from "../utils/localStorage";

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe("HomePage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds an ingredient and shows recipe results after search", async () => {
    const user = userEvent.setup();
    renderHomePage();

    await user.type(screen.getByLabelText(/tambah bahan/i), "ayam");
    await user.click(screen.getByRole("button", { name: /\+/i }));
    await user.click(screen.getByRole("button", { name: /cari resep/i }));

    expect(await screen.findByText(/Ayam Geprek Rumahan/i)).toBeInTheDocument();
  });

  it("opens the recipe detail modal from a search result", async () => {
    const user = userEvent.setup();
    renderHomePage();

    await user.type(screen.getByLabelText(/tambah bahan/i), "ayam");
    await user.click(screen.getByRole("button", { name: /\+/i }));
    await user.click(screen.getByRole("button", { name: /cari resep/i }));
    await user.click(await screen.findByRole("button", { name: /lihat detail/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/langkah/i)).toBeInTheDocument();
  });

  it("saves a recipe from search results", async () => {
    const user = userEvent.setup();
    renderHomePage();

    await user.type(screen.getByLabelText(/tambah bahan/i), "ayam");
    await user.click(screen.getByRole("button", { name: /\+/i }));
    await user.click(screen.getByRole("button", { name: /cari resep/i }));
    await user.click(await screen.findByRole("button", { name: /^simpan$/i }));

    expect(screen.getByText(/resep berhasil disimpan/i)).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(SAVED_RECIPES_KEY))).toHaveLength(1);
  });
});
