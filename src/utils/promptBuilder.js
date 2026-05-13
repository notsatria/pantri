export function buildRecipePrompt({ cuisine, ingredients }) {
  const cuisineInstruction =
    cuisine === "Semua"
      ? "berbagai gaya masakan yang cocok untuk pengguna Indonesia"
      : `masakan ${cuisine}`;

  return [
    {
      role: "system",
      content: [
        `Kamu adalah chef profesional yang ahli dalam ${cuisineInstruction}.`,
        "Rekomendasikan 3 sampai 5 resep yang realistis dari bahan pengguna.",
        "Jawab hanya dalam JSON valid tanpa markdown.",
        "Gunakan bahasa Indonesia yang natural.",
        "Setiap recipe wajib punya id, name, cuisine, duration, difficulty, ingredients, steps, tips, dan summary.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Saya punya bahan: ${ingredients.join(", ")}.`,
        `Konteks masakan: ${cuisine}.`,
        "Format JSON: {\"recipes\":[{\"id\":\"string-kebab-case\",\"name\":\"string\",\"cuisine\":\"string\",\"duration\":\"string\",\"difficulty\":\"Mudah|Sedang|Sulit\",\"ingredients\":[\"string\"],\"steps\":[\"string\"],\"tips\":\"string\",\"summary\":\"string\"}]}",
      ].join(" "),
    },
  ];
}
