<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-26

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Express

## Decision Outcome

Chosen option: FastAPI 0.115, because No server-side calculation is required, so FastAPI 0.115 serves only as the thin server layer with a health endpoint. It is the lightest sensible choice given there is nothing for it to compute.

## Consequences

The backend is effectively idle; its presence adds a deploy node for little functional gain, accepted to satisfy the required server layer and leave room to grow.
<!-- sdlc:auto:end adr -->