# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Core arithmetic engine: addition, subtraction, multiplication and division on decimal numbers with the result shown immediately. Scientific functions, parentheses, memory keys and percentages are explicitly out of scope.

Goal: perform the four basic arithmetic operations and display results immediately. Scope exclusion noted: scientific functions (powers, roots, trig, logs, parentheses, memory keys) and percentages are not part of this version. Covers stories US-001 through US-005.

**Related:** US-001, US-002, US-003, US-004, US-005

### EPIC-002 · approved · source: planning:EPIC-002

Input methods: users enter numbers and operations via on-screen buttons or the physical keyboard, including decimal entry, on both desktop and mobile.

Goal: support both on-screen (touch/click) and physical-keyboard input, plus decimal-point entry, across desktop and mobile. Covers stories US-006 through US-008.

**Related:** US-006, US-007, US-008

### EPIC-003 · approved · source: planning:EPIC-003

Clear/reset control plus friendly error handling for division-by-zero and other invalid or incomplete operations, so the app never crashes.

Goal: let users clear/reset at any time and see friendly, non-crashing error messages for division by zero and other invalid operations (e.g. two operators in a row, requesting a result with no operands). Covers stories US-009 through US-011.

**Related:** US-009, US-010, US-011

### EPIC-004 · approved · source: planning:EPIC-004

Delivery model: a responsive, single-page, anonymous, free web app that computes entirely client-side with no server-side storage or persistent history.

Goal: deliver the calculator as a responsive single-page app usable on desktop and mobile, requiring no login/accounts, no payments, and performing all computation client-side with no saved history beyond the current session. Stated assumption: no login/accounts, no payments/subscriptions, and no saved history are in scope for this version. Covers stories US-012 through US-015.

**Related:** US-012, US-013, US-014, US-015

### SPRINT-1 · approved · source: plan:SPRINT-1

First sprint builds the core calculation engine, both input methods, decimal entry, immediate result display, and the clear/reset control.

Goal: Build the core calculation engine, on-screen and keyboard input, decimal entry, immediate result display, and clear/reset control. Capacity: 20 points. Plan version 1, status approved. Story points assigned (role frontend-agent for all): US-001=3, US-002=1, US-003=1, US-004=2, US-005=1, US-006=3, US-007=2, US-008=2, US-009=2 (sprint total 17 of 20 capacity). EPIC-001, EPIC-002 and EPIC-003 (partially, via US-009) are tracked as epic-level backlog items with no points/role assigned.

**Related:** EPIC-001, EPIC-002, EPIC-003, US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

### SPRINT-2 · approved · source: plan:SPRINT-2

Second sprint adds friendly error handling for division-by-zero and other invalid operations, finalizes the responsive layout, and confirms anonymous/free/no-persistence behavior.

Goal: Add friendly error handling for division-by-zero and invalid operations, finalize responsive layout, and confirm anonymous/free/no-persistence behavior. Capacity: 20 points. Plan version 1, status approved. Story points assigned (role frontend-agent for all): US-010=2, US-011=3, US-012=3, US-013=1, US-014=1, US-015=2 (sprint total 12 of 20 capacity). EPIC-003 (remaining, via US-010/US-011) and EPIC-004 are tracked as epic-level backlog items with no points/role assigned.

**Related:** EPIC-003, EPIC-004, US-010, US-011, US-012, US-013, US-014, US-015
<!-- sdlc:auto:end narrative -->
