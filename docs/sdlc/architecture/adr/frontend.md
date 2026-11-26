<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-26

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because The entire product lives in the browser: on-screen buttons, keyboard input, decimal entry and an instantly updating display. React 19 drives this single-page, responsive UI from one codebase for desktop and mobile, and hosts all arithmetic and error handling client-side with no reloads.

## Consequences

React is heavier than needed for a tiny calculator, but it is the approved platform default and builds cleanly with no extra setup; a hand-rolled vanilla JS app would be lighter but outside the approved stack.
<!-- sdlc:auto:end adr -->