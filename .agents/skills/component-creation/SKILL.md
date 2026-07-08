---
name: component-creation
description: Defines guidelines and standards for creating React components in the Presentation Layer.
---

# Component Creation Guide

This guide defines the strict rules and standards for creating React components in the Presentation Layer (`src/presentation/components/`). All components must be designed with clean separation of concerns, consistent file structures, absolute zero inline styling, and maximum reusability.

---

## 1. Directory & File Structure Pattern

Every component must occupy its own directory named in PascalCase. Depending on the complexity and scope of the component, it should have the following file structure:

```text
ComponentName/
├── index.tsx          # Export and clean JSX (mostly calling hooks and rendering markup)
├── hook.ts            # Component logic, state, and side effects
├── styles.ts          # Styled-components definitions
├── types.ts           # Types specific to this component (optional)
└── validation.ts      # Zod validation schemas (if applicable for forms)
```

### Component Categories

- **Atoms (`src/presentation/components/atoms/`)**: Basic building blocks (e.g., buttons, input tags, labels, badges, spinners). They contain minimal or no logic, receive standard props, and are highly customizable via styles.
- **Molecules (`src/presentation/components/molecules/`)**: Combinations of atoms (e.g., form fields containing a label + input + validation error, card headers, custom dialog wraps).
- **Organisms (`src/presentation/components/organisms/`)**: Complex standalone components composed of molecules and atoms (e.g., filters, tables, full forms, headers, sidebar menus).

---

## 2. File Guidelines & Templates

### A. `index.tsx` (Clean JSX Only)

The component's entry file should be focused entirely on markup and presentation.

- **Strict Rule**: No state declarations (`useState`), effects (`useEffect`), or inline handler functions inside the component's main rendering scope.
- All dynamic states, event handlers, and data fetching must be retrieved from the custom hook defined in `hook.ts`.

#### Example Template:

```tsx
import { useComponentHook } from "./hook";
import { StyledContainer, StyledTitle, StyledSubmitButton } from "./styles";
import { ComponentProps } from "./types";

export default function ComponentName({
  title,
  onAction,
}: Readonly<ComponentProps>) {
  const { t, isPending, handleActionClick } = useComponentHook({ onAction });

  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubmitButton onClick={handleActionClick} disabled={isPending}>
        {t("general.submit")}
      </StyledSubmitButton>
    </StyledContainer>
  );
}
```

---

### B. `hook.ts` (Logic, States & Contexts)

Contains all local state management, lifecycle effects, context resolutions (translations, toast notifications, themes), and use cases/service calls.

- **Hook Naming**: Prefixed with `use` and suffixed with `Hook` (e.g., `useFormResearchHook`, `useComponentHook`).
- Resolve translation functions (`useTranslation`) and notifications (`useToast`) here.

#### Example Template:

```typescript
import { useTranslation } from "react-i18next";
import { useState, useTransition } from "react";
import { useToast } from "../../../hooks/use-toast"; // Adjust path as necessary
import { HookParams } from "./types";

export function useComponentHook({ onAction }: HookParams) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleActionClick = () => {
    startTransition(async () => {
      await onAction();
      showToast({ message: t("general.success"), type: "success" });
    });
  };

  return {
    t,
    isPending,
    handleActionClick,
  };
}
```

---

### C. styles.ts (No Inline CSS, Pure Styled-Components)

- **Strict Rule**: Avoid inline styling (`style={{ ... }}`) under all circumstances. Use styled-components instead.
- **Naming Convention**: All styled components must start with the prefix `Styled` (e.g., `StyledContainer`, `StyledHeaderRow`, `StyledCloseIcon`).
- **Theme Usage**: Always consume theme values (spacers, colors, fonts, border-radii, grid breakpoints) from the styled-components theme context. Refer to the [DefaultTheme](file:///c:/Users/CEPEDI/Projetos/wec/rastreamento-producao-frontend/src/libs/styled-components/themes/styled.d.ts) for all available tokens.
- **Extend, Don't Recreate**: Do not write raw styled tags (e.g., `styled.button`, `styled.span`) if a corresponding Atom or Molecule component already exists. Extend it instead.

#### Theme Tokens Quick Reference

Always utilize the variables defined in `src/libs/styled-components/themes/` rather than hardcoding values:

| Token Category | Available Keys / Subkeys | Example Usage |
| :--- | :--- | :--- |
| **Colors** (`theme.colors`) | **Palette**: `white`, `black`, `gray[100]` to `gray[900]`, `blue`, `dullBlue`, `indigo`, `purple`, `pink`, `red`, `lightRed`, `orange`, `yellow`, `green`, `teal`, `cyan`<br>**Semantic**: `primary`, `primaryHover`, `secondary`, `secondaryHover`, `success`, `info`, `lightInfo`, `warning`, `danger`, `darkDanger`, `lightDanger`, `active`, `inactive`<br>**Contextual**: `body.bodyBg`, `body.bodyColor`, `links.linkColor`, `shadowGray`, `table.hover`, `table.odd`, `table.buttonEdit`, `selectColor.focusedItem`, `selectColor.multiItem`, `selectColor.border` | `color: ${({ theme }) => theme.colors.primary};`<br>`background-color: ${({ theme }) => theme.colors.gray[100]};` |
| **Spacers** (`theme.spacers`) | `none`, `sm` (0.25rem), `md` (0.5rem), `lg` (0.75rem), `xl` (1rem), `xxl` (1.5rem), `"3xl"` (2rem), `"4xl"` (2.5rem), `"5xl"` (3rem) | `gap: ${({ theme }) => theme.spacers.md};`<br>`margin-top: ${({ theme }) => theme.spacers.xl};` |
| **Borders** (`theme.borders`) | **Radius**: `radius.none`, `radius.sm` (0.25rem), `radius.md` (0.4rem), `radius.lmd` (0.65rem), `radius.lg` (0.8rem), `radius.round` (9999px)<br>**Width**: `width.none`, `width.xs` (1px), `width.sm` (2px), `width.md` (4px), `width.lg` (8px), `width.xl` (16px) | `border-radius: ${({ theme }) => theme.borders.radius.md};`<br>`border: ${({ theme }) => theme.borders.width.xs} solid ...` |
| **Fonts** (`theme.fonts`) | **Family**: `family.familyBase`, `family.familyHeading`<br>**Size**: `size.xs`, `size.sm`, `size.lg`, `size.xl`, `size.xxl`<br>**Weight**: `weight[100]` to `weight[900]` | `font-size: ${({ theme }) => theme.fonts.size.lg};`<br>`font-weight: ${({ theme }) => theme.fonts.weight[600]};` |
| **Grid Breakpoints** (`theme.gridBreakpoints`) | `xs` (0), `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px), `xxl` (1400px) | `@media (min-width: ${({ theme }) => theme.gridBreakpoints.md}) { ... }` |

#### Example Template:

```typescript
import styled from "styled-components";
import Button from "../../atoms/Button"; // Extend existing button instead of styled.button

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacers.md};
  padding: ${({ theme }) => theme.spacers.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  border: ${({ theme }) => theme.borders.width.xs} solid ${({ theme }) => theme.colors.gray[200]};
`;

export const StyledTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.familyHeading};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight[600]};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export const StyledSubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacers.md};
  align-self: flex-end;
`;
```

---

### D. `types.ts` (Component & Hook Parameter Typing)

All interfaces and type declarations specific to this component should be defined here.

#### Example Template:

```typescript
export interface ComponentProps {
  title: string;
  onAction: () => Promise<void>;
}

export interface HookParams {
  onAction: () => Promise<void>;
}
```

---

### E. `validation.ts` (Zod Form Schemas)

Contains Zod schema validation functions that translate error messages using `i18next`.

#### Example Template:

```typescript
import { TFunction } from "i18next";
import { z } from "zod";

export const componentSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ error: t("general.required-field") })
      .trim()
      .min(1, t("general.required-field"))
      .max(100, t("general.validations.string-length", { 1: 1, 2: 100 })),
  });
```

---

## 3. Strict Styling Rules & Reusability

1. **Zero Inline Styles**: If a component needs margin, padding, colors, or flex layout adjustments, define a new `StyledComponent` in `styles.ts`. Programmatic styles (like a dynamic height based on window size) can be handled via CSS variables or styled-components props:
   ```typescript
   export const StyledBar = styled.div<{ $height: number }>`
     height: ${({ $height }) => `${$height}px`};
   `;
   ```
2. **Reuse Theme Tokens Exclusively**: Do not use hardcoded hex codes, pixel spacings, sizes, or raw breakpoint media queries. Always check the available tokens in [styled.d.ts](file:///c:/Users/CEPEDI/Projetos/wec/rastreamento-producao-frontend/src/libs/styled-components/themes/styled.d.ts) and reference them (e.g. `theme.colors.primary`, `theme.spacers.sm`, `theme.borders.radius.lg`, etc.).
3. **Reuse Atoms & Molecules**:
   - Check `src/presentation/components/atoms/` and `src/presentation/components/molecules/` before writing any new structural or input element.
   - Example atoms to reuse: `Button`, `Label`, `Divider` (often imported as `Separator`), `Input`, `Spinner`.
   - Example molecules to reuse: `ComplexDialog`, `SaveButton`, Form inputs (e.g., `FormInput`, `FormSelect2`, `FormCheckbox`).
4. **Form Best Practices**:
   - Create form fields using `@tanstack/react-form` bindings.
   - Wrap inputs inside form helper fields:
     ```tsx
     <form.AppField name="name">
       {(field) => (
         <field.FormInput
           label={t("fields.name")}
           placeholder={t("placeholders.name")}
         />
       )}
     </form.AppField>
     ```
   - Always suffix forms with `Form` (e.g., `ProductForm`).

---

## 4. Checklist for Reviewing / Creating Components

- [ ] Does the component follow the folder structure (`index.tsx`, `hook.ts`, `styles.ts`)?
- [ ] Is `index.tsx` entirely free of `useState`, `useEffect`, or inline event functions?
- [ ] Is there absolutely **no** `style={{ ... }}` prop used in the JSX code?
- [ ] Are styled components prefixed with `Styled`?
- [ ] Are all styling properties (colors, margins, padding, border-radii, fonts, media queries) using design tokens (`theme`) from [styled.d.ts](file:///c:/Users/CEPEDI/Projetos/wec/rastreamento-producao-frontend/src/libs/styled-components/themes/styled.d.ts) rather than hardcoded/magic CSS values?
- [ ] Did you search for and reuse existing Atoms or Molecules instead of declaring custom raw elements?
- [ ] Are strings translated using the `t()` function from `useTranslation`?
- [ ] Are types separated in `types.ts`?
