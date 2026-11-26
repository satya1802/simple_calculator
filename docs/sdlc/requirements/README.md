# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:technology-stack

Product owner approved a fixed technology stack: FastAPI backend, AWS cloud hosting, PostgreSQL database, React frontend. Backend and database are included to satisfy platform defaults but are expected to be largely unused since all calculation logic runs client-side.

- Backend: FastAPI 0.115 -- calculations run client-side, nothing stored server-side, no login; FastAPI serves the page only, named to satisfy the server-layer requirement, chosen as lightest sensible default.
- Cloud: AWS -- hosts a free, public, anonymous calculator needing cheap, reliable hosting that scales to casual traffic; chosen as the available option with room to grow.
- Database: PostgreSQL 16 -- no server-side data or session history to store; listed as the safe default in case saved calculations or accounts are added later, otherwise sits unused.
- Frontend: React 19 -- powers the on-screen buttons, keyboard input and instantly-updating display; handles desktop and mobile layouts from one codebase; platform default, builds cleanly with no extra setup.
Design must use exactly these, no substitutions.

**Related:** NFR-001

### REQ-SCOPE · approved · source: requirements:scope

Delivery scope is lightweight: the four basic arithmetic operations plus supporting input, display and error-handling capabilities. Scientific functions and percentages are explicitly excluded.

In scope: addition, subtraction, multiplication, division; decimal number entry; immediate result display; clear/reset control; on-screen button input; keyboard input; friendly division-by-zero and invalid-operation messages; responsive layout for desktop and mobile; anonymous use with no login or accounts; free to use with no payments or subscriptions; calculations run in the browser with no saved history.
Out of scope -- do not design or build: scientific functions (powers, roots, trig, logs, parentheses, memory keys) and percentages.

### REQ-FEAT-OPENING · approved · source: requirements:functional:opening-the-app

Covers how the app is accessed: no sign-in, free of charge, and a layout that adapts to desktop and mobile screens.

- Open without signing in: anyone can open and use the calculator immediately, no account, login, or personal details requested.
- Use free of charge: every feature works with no payment, subscription, or billing request at any point.
- Works on desktop and mobile: single page whose layout, buttons and display adapt to the screen, comfortable on both large and small screens.

### REQ-FEAT-ENTERING · approved · source: requirements:functional:entering-numbers

Covers the two input methods (on-screen buttons and keyboard) and decimal number entry rules.

- Enter with on-screen buttons: taps/clicks on digit and operation buttons are registered and reflected in the display, including on touchscreen devices.
- Enter with the keyboard: typed digits and operator keys are reflected in the display; pressing Enter after a complete calculation shows the result.
- Enter decimal numbers: a decimal point plus further digits is treated as a decimal value; once a number has a decimal point, a second point is not added and the number stays valid.

### REQ-FEAT-CALC · approved · source: requirements:functional:doing-calculations

Covers the four arithmetic operations and immediate result display.

- Add two numbers: correct sum shown after entering first number, addition, second number; handles decimals correctly.
- Subtract one number from another: correct difference shown, including correctly displayed negative results.
- Multiply two numbers: correct product shown, handling decimal values correctly.
- Divide one number by another: correct quotient shown for a non-zero divisor, including decimal results.
- Show the result immediately: result appears straight away with no waiting or extra steps.

### REQ-FEAT-CLEAR · approved · source: requirements:functional:clear-and-errors

Covers the clear/reset control and friendly error messaging for division-by-zero and invalid operations.

- Clear and reset: button or keyboard control returns the display to its starting state at any time, no page reload needed.
- Friendly division-by-zero message: dividing by zero shows a clear, friendly message instead of a result; clearing/resetting removes the message and readies a new calculation.
- Friendly invalid-operation message: invalid or incomplete operations (e.g. two operators in a row, requesting a result with no numbers) show a friendly message and the calculator stays usable.

### NFR-001 · approved · source: requirements:NFR-001

Privacy: all calculations must run in the browser with nothing sent to or stored on a server, and no history retained after reload.

All calculations run in the user's browser; no calculation data is sent to or stored on a server; no calculation history is kept after the page is reloaded or reopened.

### NFR-002 · approved · source: requirements:NFR-002

Performance: results must appear instantly with no full-page reloads.

Results appear immediately on screen when a calculation is completed; the calculator behaves as a single page with no full-page reloads between actions.

### NFR-003 · approved · source: requirements:NFR-003

Compatibility: must remain comfortably usable on both desktop and mobile browsers with both touch and keyboard input.

The calculator works and remains comfortably usable in both desktop and mobile browsers, with a responsive layout and support for both on-screen button taps and physical keyboard input.

### NFR-004 · approved · source: requirements:NFR-004

Availability: bad input (division by zero, invalid operations, incomplete entries) must show a friendly message, not crash.

Division by zero, invalid operations and incomplete entries show a friendly message rather than crashing, and the calculator remains usable afterwards.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-26

**Capabilities in scope:** Addition, subtraction, multiplication and division, Decimal number entry, Immediate result display, Clear/reset control, On-screen button input, Keyboard input, Friendly division-by-zero and invalid-operation messages, Responsive layout for desktop and mobile, Anonymous use with no login or accounts, Free to use with no payments or subscriptions, Calculations run in the browser with no saved history, Scientific functions and percentages left out

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | You told us every calculation runs client-side, nothing is stored on a server, and there is no login — so in practice the calculator needs no backend logic at all. FastAPI is named here only to satisfy the requirement for a server layer; it will do little more than serve the page. It is the available default and the lightest sensible choice given there is nothing for it to do. |
| cloud | AWS | A free, public, anonymous calculator just needs reliable, cheap hosting that scales to whatever casual traffic arrives. AWS is the available option and can host this at very low cost, with room to grow if the product ever gains features. For a static-feeling single-page app it is more than capable. |
| database | PostgreSQL | You were explicit that the calculator keeps no data on a server and no history beyond the current session, so there is genuinely nothing to store. PostgreSQL is listed as the database option and is the safe default should you later decide to add saved calculations or user accounts; for now it will sit effectively unused. |
| frontend | React | Your whole product lives in the browser: on-screen buttons, keyboard input, and a display that updates the moment someone presses a key. React is built for exactly this kind of single-page, responsive screen that reacts instantly to input, and it handles desktop and mobile layouts from one codebase. It is also the platform default here, so it builds cleanly with no extra setup. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Basic Arithmetic Calculation

The calculator performs the four basic arithmetic operations — addition, subtraction, multiplication and division — on decimal numbers and shows the result immediately. Scientific functions (powers, roots, trig, logs, parentheses, memory keys) and percentages are out of scope for this version.

### US-001: Perform addition

**Priority:** critical

> As a general user, I want to add two numbers together, so that I can calculate their sum.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | the user has entered the first number and selected the addition operation | the user enters a second number and requests the result | the calculator displays the correct sum of the two numbers |
| AC-002 | both operands are decimal numbers | the user adds them | the displayed sum reflects the decimal values correctly |

### US-002: Perform subtraction

**Priority:** critical

> As a general user, I want to subtract one number from another, so that I can calculate their difference.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | the user has entered the first number and selected the subtraction operation | the user enters a second number and requests the result | the calculator displays the correct difference of the two numbers |
| AC-004 | the result of a subtraction is negative | the user requests the result | the calculator displays the negative result correctly |

### US-003: Perform multiplication

**Priority:** critical

> As a general user, I want to multiply two numbers, so that I can calculate their product.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | the user has entered the first number and selected the multiplication operation | the user enters a second number and requests the result | the calculator displays the correct product of the two numbers |
| AC-006 | one or both operands are decimal numbers | the user multiplies them | the displayed product reflects the decimal values correctly |

### US-004: Perform division

**Priority:** critical

> As a general user, I want to divide one number by another, so that I can calculate their quotient.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | the user has entered the first number and selected the division operation | the user enters a non-zero second number and requests the result | the calculator displays the correct quotient of the two numbers |
| AC-008 | the division produces a decimal result | the user requests the result | the calculator displays the decimal quotient |

### US-005: See the result immediately

**Priority:** high

> As a general user, I want the result to appear as soon as I complete a calculation, so that I do not have to wait or take extra steps to see the answer.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | the user has entered a complete calculation | the user requests the result | the calculator displays the result immediately on screen without any page reload |

## EPIC-002: Number Entry and Input Methods

Users enter numbers and operations using either on-screen buttons or the physical keyboard, and may enter decimal numbers. Both input methods are supported on desktop and mobile.

### US-006: Enter numbers and operations with on-screen buttons

**Priority:** critical

> As a general user, I want to tap or click on-screen buttons for digits and operations, so that I can use the calculator without a physical keyboard, including on touch devices.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | the calculator is displayed | the user taps or clicks a digit or operation button | the corresponding digit or operation is registered and reflected in the display |
| AC-011 | the user is on a touchscreen device | the user taps the on-screen buttons | each tap is registered as the intended input |

### US-007: Enter numbers and operations with the keyboard

**Priority:** high

> As a general user, I want to type digits and operations on my physical keyboard, so that I can calculate faster on a desktop device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | the calculator is displayed on a device with a keyboard | the user presses number and operator keys | the corresponding digit or operation is registered and reflected in the display |
| AC-013 | the user presses the Enter key after entering a calculation | the calculation is complete | the calculator displays the result |

### US-008: Enter decimal numbers

**Priority:** high

> As a general user, I want to enter numbers with a decimal point, so that I can calculate with non-whole values.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | the user is entering a number | the user adds a decimal point and further digits | the number is treated as a decimal value in the calculation |
| AC-015 | a number already contains a decimal point | the user attempts to add a second decimal point to the same number | the calculator does not add a second decimal point and the number remains valid |

## EPIC-003: Clear, Reset and Error Handling

Users can clear or reset the calculator at any time, and invalid operations such as division by zero show a friendly error message rather than crashing.

### US-009: Clear or reset the calculator

**Priority:** high

> As a general user, I want a control that clears the current entry and resets the calculator, so that I can start a new calculation without reloading the page.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | the user has entered numbers or a result is displayed | the user activates the clear/reset control via button or keyboard | the display returns to its initial state ready for a new calculation |

### US-010: See a friendly message on division by zero

**Priority:** high

> As a general user, I want a clear, friendly message when I try to divide by zero, so that I understand the operation is not valid and the app does not crash.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | the user has entered a number and the division operation | the user enters zero as the divisor and requests the result | the calculator shows a friendly error message instead of a result and does not crash |
| AC-018 | a division-by-zero error message is displayed | the user activates the clear/reset control | the error message clears and the calculator is ready for a new calculation |

### US-011: See a friendly message on other invalid operations

**Priority:** medium

> As a general user, I want a friendly message when I attempt an invalid or incomplete operation, so that the app guides me rather than failing or crashing.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | the user attempts an invalid or incomplete operation (for example two operators in a row or requesting a result with no operands) | the calculator cannot produce a valid result | the calculator shows a friendly error message and remains usable without crashing |

## EPIC-004: Responsive Anonymous Web App

The calculator is delivered as a single-page, responsive web app that works on desktop and mobile, requires no login or accounts, is free with no payments, and runs all calculations client-side with no server-side storage or persistent history beyond the current session. Assumption: no login or accounts, no payments or subscriptions, and no saved history are in scope for this version.

### US-012: Use the calculator on desktop and mobile

**Priority:** high

> As a general user, I want the calculator layout to adapt to my screen size, so that I can use it comfortably on both desktop and mobile devices.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | the calculator is opened on a desktop browser | the page loads | the layout, buttons and display are sized and arranged for comfortable use on a large screen |
| AC-021 | the calculator is opened on a mobile browser | the page loads | the layout, buttons and display adapt to the smaller screen and remain usable |
| AC-022 | the user interacts with the calculator | the user performs calculations | the app behaves as a single page without full-page reloads between actions |

### US-013: Use the calculator without logging in

**Priority:** high

> As a anonymous general user, I want to use the calculator without creating an account or signing in, so that I can calculate immediately with no barriers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | a user opens the calculator for the first time | the page loads | the calculator is fully usable with no prompt to register, log in or provide personal details |

### US-014: Use the calculator free of charge

**Priority:** medium

> As a general user, I want to use all calculator features without any payment, so that I can calculate for free.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | a user is using the calculator | the user performs any supported operation | no payment, subscription or billing is requested at any point |

### US-015: Calculate without data being stored or history retained

**Priority:** medium

> As a privacy-conscious general user, I want my calculations to run in the browser without being saved to a server, so that no record of my calculations is kept beyond the current session.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | the user performs calculations | the calculations run | all computation happens client-side in the browser with no data sent to or stored on a server |
| AC-026 | the user reloads the page or opens the calculator again | the page loads | no previous calculation history is retained or displayed |
<!-- sdlc:auto:end epics -->
