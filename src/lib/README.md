# Atlas Calculator Engine

This directory (`src/lib/`) is the future home of the shared **Atlas Calculator Engine** for Calculatieloket.nl.

## Purpose

The engine provides pure, reusable TypeScript utilities for:

- Formatting numbers and currency values
- Parsing and validating user input
- Storing shared constants (tax rates, VAT rates, etc.)
- Defining shared TypeScript types

## Design principles

- **Pure functions** where possible: no DOM manipulation, no side effects, no external state.
- **No framework dependencies**: the utilities are plain TypeScript and can be imported into Astro `<script>` blocks.
- **Literal values from existing pages**: constants are copied from the current inline scripts, not invented.

## Current status

The engine files are being created incrementally. Existing calculator pages in `src/pages/` are **not yet migrated** and still contain their own inline scripts. Migration will happen in future Atlas Sprints, one calculator at a time, with build verification after each step.

## Directory layout

- `format/` — currency and number formatting
- `validation/` — input parsing and validation rules
- `utils/` — constants and small helpers
- `types/` — shared TypeScript interfaces and types
