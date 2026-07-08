---
name: component-types
description: Defines guidelines and standards for typing components and layers in the frontend application.
---

# Component Types & TypeScript Guide

This guide defines the strict TypeScript typing rules, standards, and patterns to be followed across the codebase. It ensures high type safety, consistency, and clear decoupling of layers according to the project's three-layer architecture.

---

## 1. Type Organization & Directory Structure

Types are organized based on their scope and which layer they belong to. Follow these standard locations when defining or using types:

- **Domain Models & Interfaces (`src/business/domain/models/` or `src/business/domain/interfaces/`)**:
  - Contains core business entities (e.g., `User`, `Machine`, `ProductionLine`).
  - Contains service/usecase interfaces and repository interfaces.
- **Data Transfer Objects (`src/business/domain/models/{entity}/{name}.dto.ts`)**:
  - Explicit interfaces representing payloads for API requests, forms, or filtering.
- **Component-Specific Types (`ComponentName/types.ts`)**:
  - Contains properties (`ComponentProps`), hook parameters (`HookParams`), and internal component types that are exclusive to a specific component.
- **Global / UI-Specific Types (`src/types/`)**:
  - Application-wide UI types, framework configuration types, or shared form types (e.g., `src/types/form/`).

---

## 2. Strict Type Safety Standards

- **Explicit Typing**: All function parameters, return types, variables (unless contextually typed), and object properties must be explicitly typed.
- **No Escape Hatches**: Do not use `any`, `unknown`, or `never` unless absolutely necessary (e.g., third-party library boundaries, catch blocks).
- **Document Exceptions**: If an escape hatch is required, document the reasoning with a comment and narrow the type as early as possible.

### Correct:

```typescript
interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export function getUserDisplayName(user: Readonly<UserProfile>): string {
  return `${user.name} (${user.email})`;
}
```

### Incorrect:

```typescript
// Avoid using any and omitting parameter/return types
export function getUserDisplayName(user: any) {
  return `${user.name} (${user.email})`;
}
```

---

## 3. Domain Models & Interfaces (Business Layer)

- Always import domain models and interfaces directly from the business layer.
- Never duplicate domain structures inside the presentation or infrastructure layers.
- **Dependency Inversion**: Rely on business-defined interfaces for any service/repository execution. Presentation and infrastructure layers must use these interfaces rather than concrete implementations.

### Correct:

```typescript
// Import domain models from the business layer
import { ProductionLine } from "@/business/domain/models/production-line";

interface ProductionLineCardProps {
  productionLine: ProductionLine;
}
```

---

## 4. Explicit DTOs & Form Mappings

- **No Utility Type Hacks**: Do not use TypeScript utility types like `Omit<Entity, "id">` or `Partial<Entity>` for form payloads, filters, or API requests.
- **Explicit Definition**: Always create explicit DTO (Data Transfer Object) interfaces in the domain folder to represent form schemas, filter payloads, and API bodies.
- **Layer Mapping**: Perform explicit mapping between DTOs and domain models in the Service or Mapper layers.

### Correct:

```typescript
// In src/business/domain/models/user/create-user.dto.ts
export interface CreateUserDTO {
  username: string;
  email: string;
  role: UserRole;
}

// In the service/usecase implementation (src/business/services/user/create-user.ts)
export class CreateUserService {
  public execute(dto: CreateUserDTO): Promise<User> {
    const userEntity = UserMapper.toDomain(dto);
    return this.userRepository.save(userEntity);
  }
}
```

### Incorrect:

```typescript
// Avoid using partial or omit hacks for form payloads
export class CreateUserService {
  public execute(payload: Omit<User, "id" | "createdAt">): Promise<User> {
    // ...
  }
}
```

---

## 5. Enums for Fixed Choice Lists

- Use TypeScript `enums` for fixed lists of choices, categories, status values, types, and dropdown option arrays.
- Avoid using arbitrary string literals (magic strings) or union types for state or category-based arrays.
- Declare option arrays derived from enums to be used in UI components (e.g., select inputs).

### Correct:

```typescript
// In src/business/domain/models/user/user-role.ts
export enum UserRole {
  Admin = "ADMIN",
  Operator = "OPERATOR",
  Supervisor = "SUPERVISOR",
}

// Array of options derived from enum
export const USER_ROLE_OPTIONS = Object.values(UserRole);
```

### Incorrect:

```typescript
// Avoid union types for fixed sets of database-stored categories
type UserRole = "ADMIN" | "OPERATOR" | "SUPERVISOR";
```

---

## 6. Checklist for Reviewing Types

- [ ] Are all functions explicitly typed for both parameters and return values?
- [ ] Are there any occurrences of `any`, `unknown`, or `never` that could be narrowly typed?
- [ ] Are form data models typed with explicit DTOs rather than generic `Omit` or `Partial` types?
- [ ] Are domain entities imported directly from the business layer?
- [ ] Are fixed choice lists represented as typed `enums`?
- [ ] Are component-specific types isolated in a local `types.ts` file?
