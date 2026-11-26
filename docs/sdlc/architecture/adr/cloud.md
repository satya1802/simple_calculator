<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-26

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because A free, anonymous public calculator needs cheap, reliable hosting that scales to casual traffic. AWS hosts the static-feeling SPA via S3/CloudFront at very low cost with room to grow.

## Consequences

AWS offers far more than this app needs, but the minimal footprint (CDN + small API + standby RDS) keeps cost low and matches the approved cloud.
<!-- sdlc:auto:end adr -->