<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-26

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because The app persists nothing and keeps no history (NFR-001, US-015), so PostgreSQL 16 is provisioned as the safe default should saved calculations or accounts be added later; for now it stores no application data.

## Consequences

Running a managed database that holds no tables is pure standby cost, accepted because it is the approved stack and avoids a later migration if persistence is introduced.
<!-- sdlc:auto:end adr -->