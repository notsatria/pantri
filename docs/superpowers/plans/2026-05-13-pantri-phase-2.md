# Pantri Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add saved recipes to `pantri` with localStorage persistence, save actions, routing, and a `/saved` management page.

**Architecture:** Saved recipes live behind a small localStorage utility and `useSavedRecipes` hook. The app uses React Router for `/` and `/saved`, while recipe cards and detail modal receive save-state props so presentation components stay reusable.

**Tech Stack:** React, Vite, Tailwind CSS, React Router, React Testing Library, Vitest

---

## File Map

- Modify: `package.json`, `package-lock.json`
- Modify: `src/App.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/RecipeCard.jsx`
- Modify: `src/components/RecipeDetailModal.jsx`
- Modify: `src/components/RecipeGrid.jsx`
- Create: `src/components/AppNav.jsx`
- Create: `src/pages/SavedRecipesPage.jsx`
- Create: `src/hooks/useSavedRecipes.js`
- Create: `src/hooks/useSavedRecipes.test.jsx`
- Create: `src/utils/localStorage.js`

### Task 1: Add Phase 2 Plan And Router Dependency

- [x] **Step 1: Install React Router**

Run: `npm install react-router-dom`
Expected: `react-router-dom` is added to `package.json` and `package-lock.json`.

- [x] **Step 2: Commit the planning/dependency update**

```bash
git add package.json package-lock.json docs/superpowers/plans/2026-05-13-pantri-phase-2.md
git commit -m "docs: add pantri phase 2 plan"
```

### Task 2: Add Saved Recipe Storage Hook

- [x] **Step 1: Create localStorage helpers**

Create `src/utils/localStorage.js` with safe JSON read/write helpers and key `pantri_saved_recipes`.

- [x] **Step 2: Create `useSavedRecipes` tests**

Cover initial empty state, saving a recipe, duplicate prevention, removing one recipe, clearing all recipes, and max capacity.

- [x] **Step 3: Implement `useSavedRecipes`**

The hook should expose `savedRecipes`, `saveRecipe`, `removeRecipe`, `clearSavedRecipes`, `isRecipeSaved`, and `statusMessage`.

- [x] **Step 4: Run hook tests**

Run: `npm test -- src/hooks/useSavedRecipes.test.jsx`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/utils/localStorage.js src/hooks/useSavedRecipes.js src/hooks/useSavedRecipes.test.jsx
git commit -m "feat: add saved recipes storage hook"
```

### Task 3: Add Routing And Navigation

- [x] **Step 1: Create `AppNav`**

Create a compact neobrutalist nav with links to `/` and `/saved`.

- [x] **Step 2: Update `App.jsx` routes**

Use `BrowserRouter`, `Routes`, and `Route` for home and saved pages.

- [x] **Step 3: Create a temporary `SavedRecipesPage` shell**

Render heading, empty state, and back link placeholder.

- [x] **Step 4: Run build**

Run: `npm run build`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/App.jsx src/components/AppNav.jsx src/pages/SavedRecipesPage.jsx
git commit -m "feat: add saved recipes route"
```

### Task 4: Wire Save Actions Into Recipe Results

- [x] **Step 1: Extend page tests**

Update `src/pages/HomePage.test.jsx` to save a recipe and assert saved state appears.

- [x] **Step 2: Update recipe components**

Add `onSaveRecipe` and `isRecipeSaved` props to `RecipeGrid`, `RecipeCard`, and `RecipeDetailModal`.

- [x] **Step 3: Wire `useSavedRecipes` into `HomePage`**

Pass save handlers into recipe result components and show a short status message.

- [x] **Step 4: Run page tests**

Run: `npm test -- src/pages/HomePage.test.jsx`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/pages/HomePage.jsx src/pages/HomePage.test.jsx src/components/RecipeGrid.jsx src/components/RecipeCard.jsx src/components/RecipeDetailModal.jsx
git commit -m "feat: add save actions to recipe results"
```

### Task 5: Build Saved Recipes Management Page

- [ ] **Step 1: Create saved page tests**

Test empty state and rendering saved recipe data seeded into localStorage.

- [ ] **Step 2: Implement saved page**

Use `useSavedRecipes` to list saved recipes, open detail modal, remove one recipe, and clear all recipes.

- [ ] **Step 3: Run saved page tests**

Run: `npm test -- src/pages/SavedRecipesPage.test.jsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/SavedRecipesPage.jsx src/pages/SavedRecipesPage.test.jsx
git commit -m "feat: add saved recipes management page"
```

### Task 6: Verify Phase 2

- [ ] **Step 1: Run full tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Check git status**

Run: `git status --short`
Expected: only intended checklist changes before final commit.

- [ ] **Step 4: Commit final checklist**

```bash
git add docs/superpowers/plans/2026-05-13-pantri-phase-2.md
git commit -m "docs: complete pantri phase 2 checklist"
```
