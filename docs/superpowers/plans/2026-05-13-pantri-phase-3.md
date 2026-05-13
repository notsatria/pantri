# Pantri Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate real Groq recipe generation while keeping Pantri usable without an API key through the existing mock fallback.

**Architecture:** A provider service chooses Groq when `VITE_GROQ_API_KEY` is configured and falls back to the mock service otherwise. Prompt building and response parsing live in small utilities so the hook and UI can remain mostly unchanged.

**Tech Stack:** React, Vite, Tailwind CSS, Fetch API, Groq Chat Completions API, Vitest

---

## File Map

- Create: `.env.example`
- Create: `src/utils/promptBuilder.js`
- Create: `src/utils/recipeResponseParser.js`
- Create: `src/services/groqRecipes.js`
- Create: `src/services/recipeSearch.js`
- Modify: `src/hooks/useRecipeSearch.js`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/ErrorBanner.jsx`
- Create: tests for prompt builder, parser, and Groq service

### Task 1: Add Phase 3 Plan And Env Contract

- [x] **Step 1: Write Phase 3 plan**
- [x] **Step 2: Add `.env.example`**
- [x] **Step 3: Commit plan/env contract**

### Task 2: Add Prompt Builder And Parser

- [x] **Step 1: Implement prompt builder**
- [x] **Step 2: Implement response parser/normalizer**
- [x] **Step 3: Add tests**
- [x] **Step 4: Run tests**
- [x] **Step 5: Commit**

### Task 3: Add Groq Service And Provider Selection

- [x] **Step 1: Implement Groq fetch service**
- [x] **Step 2: Add provider service with mock fallback**
- [x] **Step 3: Add tests for API success/error/fallback**
- [x] **Step 4: Wire `useRecipeSearch` to provider service**
- [x] **Step 5: Commit**

### Task 4: Add UI Feedback For AI Provider

- [ ] **Step 1: Surface provider mode in HomePage**
- [ ] **Step 2: Improve error banner copy for API/config failures**
- [ ] **Step 3: Update page tests**
- [ ] **Step 4: Commit**

### Task 5: Verify Phase 3

- [ ] **Step 1: Run full tests**
- [ ] **Step 2: Run production build**
- [ ] **Step 3: Check git status**
- [ ] **Step 4: Commit final checklist**
