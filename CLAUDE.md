# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check (tsc -b) then bundle (vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test runner is configured.

## Rules

- All code, variable names, component names, type names, and UI text must be in English.
- Do not add comments anywhere in the code.
- Do not use emojis anywhere in code or UI.

## Project: F1 Bingo 2026

Collaborative F1-themed bingo app to share among friends during the 2026 Formula 1 season.

**Core concept:** Each user builds their own bingo card with squares describing events that may happen during the season — both on-track (pole positions, retirements, safety cars, etc.) and off-track (drama, controversies, paddock gossip). The goal is to mark off events as they happen and complete bingo lines.

**Required features:**
- Add, edit, and delete squares with free text
- Full persistence via `localStorage` (no backend)
- Generate and share a preview of the bingo card
- Mark squares as completed when their event occurs
- Bingo line detection: when adjacent marked squares form a complete line (horizontal, vertical, or diagonal), the line is highlighted visually

**Visual identity:**
- Official F1 aesthetic: bold/condensed typography, red (#E8002D), black, and white palette
- Aggressive, high-contrast style consistent with the Formula 1 brand

## Architecture

React 19 SPA built with Vite 7 and TypeScript (strict mode).

**Entry point chain:** `index.html` → `src/main.tsx` (StrictMode root) → `src/App.tsx`

**React Compiler** (`babel-plugin-react-compiler`) is enabled via `vite.config.ts` — this auto-memoizes components and replaces manual `useMemo`/`useCallback`. Do not add manual memoization unless profiling shows a specific need.

**TypeScript config:** `tsconfig.json` references two configs — `tsconfig.app.json` (ES2022, browser) and `tsconfig.node.json` (ES2023, build tools). Both have strict mode, `noUnusedLocals`, and `noUnusedParameters` enabled.

**ESLint** uses the flat config format (ESLint 9.x) in `eslint.config.js`, with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
