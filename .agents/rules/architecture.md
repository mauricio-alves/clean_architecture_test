---
trigger: always_on
---

# Project Architecture Guide

This project follows a strict three-layer architecture pattern based on clear separation of concerns and the Single Responsibility Principle.

## Architecture Layers

### 1. Business Layer (`src/business/`)

Contains all business logic and domain-specific code. This layer is the core of the application.

- **domain/** - Domain entities, models, interfaces, and core business objects.
- **services/** - Business logic implemented as **Use Cases**. We strictly follow the single-responsibility principle. Avoid "fat" service classes with multiple methods. Each file must represent a single use case (e.g., `src/business/services/user/get-user.ts`).
- **mappers/** - Data transformation logic between layers (DTO to domain, domain to DTO).
- **tools/** - Business-specific utility functions and helpers.
- **singleton/** - Singleton pattern implementations for shared business instances.

**Rules:**

- Business logic must be 100% independent of UI, frameworks, and external infrastructure.
- No direct imports from the Presentation or Infrastructure layers.
- Rely on Dependency Injection (Interfaces) for any external needs.
- All data transformation to/from external sources (APIs) happens here.
- Create explicit interfaces for forms, filters, and DTOs
- When creating services for operations (create, delete, update, get, getPaged and getByName) use the `src\business\services\base` implementations to be extended on the newly created classes. Follow the `src\business\services\production-line` implementation example.

### 2. Infrastructure Layer (`src/infrastructure/`)

Handles all external communications, data persistence, and HTTP clients.

- **repositories/** - Data access layer and external API integrations.
- **interceptors/** - HTTP interceptors for request/response handling.

**Rules:**

- **Use Case Pattern:** Repositories must follow the use case pattern just like services. Do not group multiple database/API calls into a single class. Create one implementation per functionality.
- Interfaces describing the repository use cases must be defined in the domain layer: `src/business/domain/repositories/{entity}/**`.
- Implementations reside in the infrastructure layer: `src/infrastructure/repositories/{entity}/**` (e.g., `src/infrastructure/repositories/user/get-me.ts`).
- When creating repositories for operations (create, delete, update, get, getPaged and getByName) use the `src\infrastructure\repositories\base` implementations to be extended on the newly created classes. Follow the `src\infrastructure\repositories\production-line` implementation example.

### 3. Presentation Layer (`src/presentation/`)

Contains all React UI components, routing, and visual elements.

- **components/** - React components organized by Atomic Design principles:
  - **atoms/** - Basic building blocks (buttons, inputs).
  - **molecules/** - Combinations of atoms (form fields with labels).
  - **organisms/** - Complex standalone components (headers, complex forms).
- **pages/** - React pages organized by feature or domain.
- **routes/** - React Router configuration (`@tanstack/react-router`).

**Rules:**

- Components MUST NOT contain business logic.
- Interact with the Business layer exclusively through Use Cases injected via Inversify.
- The component `index.ts` file should only contain the custom hook call and the JSX return. All logic goes into the `hook.ts`.
- Pages are created based on the route config. Each route is strictly linked to a page component.

## Dependency Injection (Inversify) Strategy

We use InversifyJS to manage dependencies and decouple layers.

**Rules:**

- **Entity-Based Modules:** DI tokens MUST be separated by modules, where each module represents a single entity (e.g., User, Machine, Product).
- Do not use a single massive file for all tokens. Each entity should have its own DI module configuration registering its specific Use Cases and Repositories.
- Inject specific Use Cases into components/hooks, not entire domains.

## Component and Page Structure Pattern

Every component and page must follow this strict file structure:

````text
ComponentName/
├── index.ts          # Main component export (Clean JSX only)
├── hook.ts           # Component logic, state, and side effects
├── styles.ts         # Styled-components definitions
└── validation.ts     # Zod validation schemas (if applicable)

**Component Guidelines:**

* `index.ts`: Keep it focused on rendering.
* `hook.ts`: Contains `useState`, `useEffect`, event handlers, and DI resolution.
* `styles.ts`: Use `styled-components`. Reuse existing components from the `components/` folder when styling (e.g., extend `Label` instead of creating `styled.label`).
* `validation.ts`: Reserved for `zod` form validations.

**Pages Guidelines:**
You can use the `src\presentation\pages\production-line\index.tsx` as an page example.

The component integration to create CRUD components is the following: Page -> OperationComponent -> FormComponent
The OperationComponent defines the submit action (what endpoint we will send the data) and it is classified as Add/Edit/Disable components
The FormComponent creates the TanstackForm instance and defines all fields and validation

***FormComponent:***
Every entity form has a base form that is defined inside FormEntity component where we create all the base fields and the Tanstack Form instance. You can find an example at `src\presentation\components\organisms\production-line\Form\index.tsx`

***AddComponent:***
The AddComponent defines how to create a entity on our system. One example of AddComponent is `src\presentation\components\organisms\production-line\Add\index.tsx` where we define the Add form.

***EditComponent:***
The EditComponent defines how to update a entity on our system. One example of EditComponent is `src\presentation\components\organisms\production-line\Edit\index.tsx` where we define the Add form.

***DisableComponent:***
The DisableComponent is a component that uses `src\presentation\components\organisms\ModalDisable\index.tsx` to confirm if the user wants to disable an item. The disable action is defined inside the DisableComponent. You can find an example at `src\presentation\components\organisms\production-line\Disable\index.tsx`

***ListComponent:***
The ListComponent is a component that uses DynamicTable (`src\presentation\components\organisms\DynamicTablePaginated\index.tsx`) component to render a paged table of the related entity that we are working. You can find and example at `src\presentation\components\organisms\production-line\List\index.tsx`


**Forms Guidelines:**

* Use `@tanstack/react-form`. Configuration hooks are in `src/hooks/use-app-form`, `use-form-context`, and `use-form-base`.
* Prioritize existing integrated components in `components/molecules/Form` (e.g., `Input`, `Select`, `Select2`, `Checkbox`, `FormDatePicker`).
* Form components must be suffixed with `Form` (e.g., `UserForm`).
* Render form fields inside tags; do not pass children props as a function returning the field. Example:
```tsx
<form.AppField name="username">
  {(field) => (
    <field.FormInput
      placeholder={t("auth.placeholder.username")}
      onKeyDown={onKeyDownEvent}
    />
  )}
</form.AppField>

````

## Additional Directories

- **`src/types/`**: Framework/UI specific TypeScript types. Form-related types go in `src/types/form/`.
- **`src/utils/`**: Framework-agnostic, reusable utility functions.
- **`src/hooks/`**: Shared custom React hooks.
- **`src/context/`**: React Context providers (e.g., `theme.tsx`, `toaster.tsx`).
- **`src/assets/`**: Static resources (`i18n/`, `icons/`, `images/`).
- **`src/libs/`**: Third-party library configurations/wrappers (Inversify config, local-storage, pdfmake).
- **`src/business/custom-hooks`**: All the application requests will be made through React Query. So if a page needs to consume data we will create a useQuery custom hook. If we are going to make operations (create, update, delete) we will create a mutation using useMutation. If it is a paged query to be used in a DynamicTable component we do not need to use the useQuery hook given that the DynamicTable implements it, we should only define the queryFn that makes the request.

## Dependency Flow

Dependencies must flow **downward** only.

```text
Presentation Layer
       ↓ (uses)
Business Layer (Use Cases)
       ↓ (defines interfaces for / uses)
Infrastructure Layer (Repositories)

```

_Upper layers should never import from lower layers directly._

## Core Best Practices

1. **Strict SRP & Usecases:** Always create new, single-purpose Use Case classes for both Services and Repositories. Do not add methods to existing classes.
2. **Domain Isolation:** Create new services/repositories for new entities (e.g., "Product"). Do not mix Product logic into the "User" use cases.
3. **Explicit Interfaces:** Create explicit interfaces for forms, filters, and DTOs in `domain/models`. **DO NOT USE TypeScript `Omit` or `Partial**` to hack existing models. Map objects properly in the Service layer.
4. **Query Invalidation:** When deleting/updating/activating an item, always invalidate the TanStack query for that entity's list page.
5. **Internationalization:** All rendered text must use the `t` function from our i18n setup. Add new strings to `/src/assets/i18n/{lang}/frontend.json`.
6. **Paged Queries:** `getPaged` functions must be defined as hooks in `src/business/custom-hook/{entity}/`. If used inside a `select2`, return an async function fetching via the Service (since Select2 handles `useQuery` internally). Example: `src/business/query-hooks/machine/get-login-paged.ts`.
7. **Type Safety:** Define local types in a `types.ts` file inside the component folder if they are exclusive to that component. Otherwise, use `src/types/`.
8. You can use the useToast hook to render toasts and improve the user feedback.
