# Architecture Overview

Describe the high-level architecture, components, responsibilities, and data flow.

## Components

- Frontend — responsibilities
- API Gateway / Backend — responsibilities
- Data stores

## Data flow

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant B as Backend
  U->>F: interacts
  F->>B: API request
  B->>DB: reads/writes
```
