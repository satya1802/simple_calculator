# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Build the core calculation engine, on-screen and keyboard input, decimal entry, immediate result display, and clear/reset control.

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Perform addition | 3 | frontend-agent | — |
| US-002 | Story | Perform subtraction | 1 | frontend-agent | US-001 |
| US-003 | Story | Perform multiplication | 1 | frontend-agent | US-001 |
| US-004 | Story | Perform division | 2 | frontend-agent | US-001 |
| US-005 | Story | See the result immediately | 1 | frontend-agent | US-001 |
| US-006 | Story | Enter numbers and operations with on-screen buttons | 3 | frontend-agent | US-001 |
| US-007 | Story | Enter numbers and operations with the keyboard | 2 | frontend-agent | US-006 |
| US-008 | Story | Enter decimal numbers | 2 | frontend-agent | US-006 |
| US-009 | Story | Clear or reset the calculator | 2 | frontend-agent | US-006 |

## Sprint 2: Sprint 2

Add friendly error handling for division-by-zero and invalid operations, finalize responsive layout, and confirm anonymous/free/no-persistence behavior.

Capacity: 20 points · Committed: 12

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-010 | Story | See a friendly message on division by zero | 2 | frontend-agent | US-004, US-009 |
| US-011 | Story | See a friendly message on other invalid operations | 3 | frontend-agent | US-006, US-007 |
| US-012 | Story | Use the calculator on desktop and mobile | 3 | frontend-agent | US-006 |
| US-013 | Story | Use the calculator without logging in | 1 | frontend-agent | US-006 |
| US-014 | Story | Use the calculator free of charge | 1 | frontend-agent | US-006 |
| US-015 | Story | Calculate without data being stored or history retained | 2 | frontend-agent | US-001 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
