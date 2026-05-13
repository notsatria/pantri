# Pantri Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `pantri` phase 1 as a frontend-first React app with refreshed branding, ingredient input flow, mock recipe search, loading and error states, and recipe detail modal.

**Architecture:** The app is a small Vite-based SPA with one main route. UI components stay presentation-focused while a dedicated hook and mock service own the async recipe-search flow, making the mock adapter replaceable with a real Groq service in later phases.

**Tech Stack:** React, Vite, Tailwind CSS, React Testing Library, Vitest

---

## File Map

- Create: `package.json` for scripts and dependencies
- Create: `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`
- Create: `src/index.css`, `tailwind.config.js`, `postcss.config.js`
- Create: `src/pages/HomePage.jsx`
- Create: `src/components/HeroSection.jsx`
- Create: `src/components/CuisineSelect.jsx`
- Create: `src/components/IngredientComposer.jsx`
- Create: `src/components/IngredientChipList.jsx`
- Create: `src/components/SearchButton.jsx`
- Create: `src/components/RecipeSkeletonList.jsx`
- Create: `src/components/RecipeGrid.jsx`
- Create: `src/components/RecipeCard.jsx`
- Create: `src/components/RecipeDetailModal.jsx`
- Create: `src/components/ErrorBanner.jsx`
- Create: `src/constants/cuisines.js`
- Create: `src/mocks/recipes.js`
- Create: `src/mocks/searchRecipes.js`
- Create: `src/hooks/useRecipeSearch.js`
- Create: `src/utils/ingredients.js`
- Create: `src/utils/recipes.js`
- Create: `src/test/setup.js`
- Create: `src/utils/ingredients.test.js`
- Create: `src/hooks/useRecipeSearch.test.jsx`
- Create: `src/pages/HomePage.test.jsx`

### Task 1: Scaffold Project Baseline

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [x] **Step 1: Create package metadata and scripts**

```json
{
  "name": "pantri",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [x] **Step 2: Create the Vite HTML shell**

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pantri</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [x] **Step 3: Create the React entry point**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [x] **Step 4: Create the app shell**

```jsx
import { HomePage } from "./pages/HomePage";

export default function App() {
  return <HomePage />;
}
```

- [x] **Step 5: Commit**

```bash
git add package.json index.html vite.config.js src/main.jsx src/App.jsx
git commit -m "chore: scaffold pantri app shell"
```

### Task 2: Add Styling Baseline And Brand Tokens

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`

- [x] **Step 1: Define Tailwind content scanning and theme tokens**

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#FAFAF8",
        butter: "#FFE500",
        danger: "#FF4444",
        mint: "#00C853",
      },
      boxShadow: {
        brutal: "4px 4px 0 #111111",
        "brutal-sm": "2px 2px 0 #111111",
      },
      borderRadius: {
        brutal: "4px",
      },
    },
  },
  plugins: [],
};
```

- [x] **Step 2: Add the PostCSS config**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [x] **Step 3: Create the global CSS with Tailwind directives and base theme**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #111111;
  background: #fafaf8;
  font-family: "Arial", sans-serif;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 229, 0, 0.25), transparent 30%),
    #fafaf8;
  color: #111111;
}
```

- [x] **Step 4: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "feat: add pantri visual foundation"
```

### Task 3: Build Static Home Page Structure

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/components/HeroSection.jsx`
- Create: `src/components/CuisineSelect.jsx`
- Create: `src/components/IngredientComposer.jsx`
- Create: `src/components/IngredientChipList.jsx`
- Create: `src/components/SearchButton.jsx`
- Create: `src/constants/cuisines.js`

- [x] **Step 1: Create cuisine constants**

```js
export const cuisines = [
  "Indonesia",
  "Jepang",
  "Korea",
  "Italia",
  "Prancis",
  "India",
  "Thailand",
  "China",
  "Meksiko",
  "Amerika",
  "Timur Tengah",
  "Semua"
];
```

- [x] **Step 2: Build the hero and form components with props-only contracts**

```jsx
export function HeroSection() {
  return (
    <section>
      <p>pantri</p>
      <h1>Masak enak dari bahan yang sudah ada.</h1>
      <p>Masukkan isi dapurmu, lalu biarkan pantri kasih inspirasi menu yang masuk akal dan bikin pengen masak.</p>
    </section>
  );
}
```

- [x] **Step 3: Compose the page with static state placeholders**

```jsx
export function HomePage() {
  return (
    <main>
      <HeroSection />
      <CuisineSelect value="Indonesia" onChange={() => {}} />
      <IngredientComposer
        ingredients={[]}
        draftValue=""
        onDraftChange={() => {}}
        onAddIngredient={() => {}}
        onRemoveIngredient={() => {}}
      />
      <SearchButton disabled loading={false} onClick={() => {}} />
    </main>
  );
}
```

- [x] **Step 4: Commit**

```bash
git add src/pages/HomePage.jsx src/components/HeroSection.jsx src/components/CuisineSelect.jsx src/components/IngredientComposer.jsx src/components/IngredientChipList.jsx src/components/SearchButton.jsx src/constants/cuisines.js
git commit -m "feat: add pantri home page structure"
```

### Task 4: Add Ingredient Utilities And Tests

**Files:**
- Create: `src/utils/ingredients.js`
- Create: `src/utils/ingredients.test.js`

- [x] **Step 1: Write the failing utility tests**

```js
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
});
```

- [x] **Step 2: Run tests to verify failure**

Run: `npm test -- src/utils/ingredients.test.js`
Expected: FAIL with module or export errors

- [x] **Step 3: Write minimal utility implementation**

```js
export function normalizeIngredientName(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function canAddIngredient(existingIngredients, nextValue, maxIngredients = 20) {
  const normalized = normalizeIngredientName(nextValue);

  if (!normalized) return false;
  if (existingIngredients.length >= maxIngredients) return false;

  return !existingIngredients.some(
    (item) => normalizeIngredientName(item) === normalized,
  );
}
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm test -- src/utils/ingredients.test.js`
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/utils/ingredients.js src/utils/ingredients.test.js
git commit -m "test: add ingredient validation utilities"
```

### Task 5: Add Mock Recipe Search Flow

**Files:**
- Create: `src/mocks/recipes.js`
- Create: `src/mocks/searchRecipes.js`
- Create: `src/hooks/useRecipeSearch.js`
- Create: `src/hooks/useRecipeSearch.test.jsx`

- [x] **Step 1: Write the failing hook test for success and error states**

```jsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRecipeSearch } from "./useRecipeSearch";

describe("useRecipeSearch", () => {
  it("returns recipes after a successful mock search", async () => {
    const { result } = renderHook(() => useRecipeSearch());
    await act(async () => {
      await result.current.search({
        cuisine: "Indonesia",
        ingredients: ["ayam", "cabai"],
      });
    });
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.recipes.length).toBeGreaterThan(0);
  });
});
```

- [x] **Step 2: Run test to verify failure**

Run: `npm test -- src/hooks/useRecipeSearch.test.jsx`
Expected: FAIL with missing hook or service

- [x] **Step 3: Add mock recipes, async mock search, and hook state**

```jsx
const initialState = {
  status: "idle",
  recipes: [],
  errorMessage: null,
};

export function useRecipeSearch() {
  const [status, setStatus] = useState(initialState.status);
  const [recipes, setRecipes] = useState(initialState.recipes);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  async function search({ cuisine, ingredients }) {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const nextRecipes = await searchRecipes({ cuisine, ingredients });
      setRecipes(nextRecipes);
      setStatus("success");
    } catch (error) {
      setRecipes([]);
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  return { status, recipes, errorMessage, search };
}
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm test -- src/hooks/useRecipeSearch.test.jsx`
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/mocks/recipes.js src/mocks/searchRecipes.js src/hooks/useRecipeSearch.js src/hooks/useRecipeSearch.test.jsx
git commit -m "feat: add mock recipe search flow"
```

### Task 6: Wire The Interactive Home Page

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/IngredientComposer.jsx`
- Modify: `src/components/IngredientChipList.jsx`
- Modify: `src/components/CuisineSelect.jsx`

- [x] **Step 1: Write the failing page interaction test**

```jsx
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

    expect(await screen.findByText(/ayam/i)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify failure**

Run: `npm test -- src/pages/HomePage.test.jsx`
Expected: FAIL because page is still static

- [x] **Step 3: Implement page state, input flow, and search wiring**

```jsx
const [selectedCuisine, setSelectedCuisine] = useState("Indonesia");
const [draftIngredient, setDraftIngredient] = useState("");
const [ingredients, setIngredients] = useState([]);
const { status, recipes, errorMessage, search } = useRecipeSearch();
```

Use the utilities to add or remove ingredients, disable the CTA when no valid ingredients exist, and call `search` with:

```js
await search({
  cuisine: selectedCuisine,
  ingredients: ingredients.map((item) => item.name),
});
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm test -- src/pages/HomePage.test.jsx`
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/pages/HomePage.jsx src/components/IngredientComposer.jsx src/components/IngredientChipList.jsx src/components/CuisineSelect.jsx src/pages/HomePage.test.jsx
git commit -m "feat: wire pantri ingredient search flow"
```

### Task 7: Add Recipe States And Detail Modal

**Files:**
- Create: `src/components/RecipeSkeletonList.jsx`
- Create: `src/components/RecipeGrid.jsx`
- Create: `src/components/RecipeCard.jsx`
- Create: `src/components/RecipeDetailModal.jsx`
- Create: `src/components/ErrorBanner.jsx`
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Extend the page test to cover loading, error, and detail modal**

```jsx
it("opens the recipe detail modal from a search result", async () => {
  const user = userEvent.setup();
  render(<HomePage />);

  await user.type(screen.getByLabelText(/tambah bahan/i), "telur");
  await user.click(screen.getByRole("button", { name: /\+/i }));
  await user.click(screen.getByRole("button", { name: /cari resep/i }));
  await user.click(await screen.findByRole("button", { name: /lihat detail/i }));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test -- src/pages/HomePage.test.jsx`
Expected: FAIL because result-state components do not exist yet

- [ ] **Step 3: Implement skeletons, grid, cards, error banner, and modal**

```jsx
{status === "loading" ? <RecipeSkeletonList count={3} /> : null}
{status === "error" ? <ErrorBanner message={errorMessage} onRetry={handleSearch} /> : null}
{status === "success" ? <RecipeGrid recipes={recipes} onOpenDetail={setSelectedRecipe} /> : null}
<RecipeDetailModal recipe={selectedRecipe} open={Boolean(selectedRecipe)} onClose={() => setSelectedRecipe(null)} />
```

- [ ] **Step 4: Run test suite to verify pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/RecipeSkeletonList.jsx src/components/RecipeGrid.jsx src/components/RecipeCard.jsx src/components/RecipeDetailModal.jsx src/components/ErrorBanner.jsx src/pages/HomePage.jsx src/pages/HomePage.test.jsx
git commit -m "feat: add recipe result states and detail modal"
```

### Task 8: Verify Build And Finish

**Files:**
- Modify: `package.json`
- Create or modify only if needed during verification fixes

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: PASS with generated `dist/`

- [ ] **Step 2: Run full tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Review changed files for accidental scope creep**

Run: `git status --short`
Expected: only intended project files are changed

- [ ] **Step 4: Commit any verification-only fixes**

```bash
git add .
git commit -m "chore: finalize pantri phase 1 baseline"
```

## Self-Review

Spec coverage:

- hero, copy refresh, cuisine select, ingredient flow, CTA, skeleton, recipe results, modal, and error states are all covered
- localStorage, saved page, and Groq integration are intentionally excluded and deferred to later phases

Placeholder scan:

- no `TODO`, `TBD`, or implicit “implement later” steps remain

Type consistency:

- data names used in components, tests, and hook steps align on `cuisine`, `ingredients`, `recipes`, `status`, `errorMessage`, and `selectedRecipe`
