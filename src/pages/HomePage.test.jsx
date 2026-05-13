import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("adds an ingredient and shows recipe results after search", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText(/tambah bahan/i), "ayam");
    await user.click(screen.getByRole("button", { name: /\+/i }));
    await user.click(screen.getByRole("button", { name: /cari resep/i }));

    expect(await screen.findByText(/Ayam Geprek Rumahan/i)).toBeInTheDocument();
  });

  it("opens the recipe detail modal from a search result", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText(/tambah bahan/i), "ayam");
    await user.click(screen.getByRole("button", { name: /\+/i }));
    await user.click(screen.getByRole("button", { name: /cari resep/i }));
    await user.click(await screen.findByRole("button", { name: /lihat detail/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/langkah/i)).toBeInTheDocument();
  });
});
