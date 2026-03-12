# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for agents operating in the Visual Story Portfolio codebase.

## Project Overview

- **Framework:** Next.js 16 (App Router) + React 18
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion + Vanilla Tilt
- **Testing:** Vitest (unit) + Playwright (E2E)

---

## Build & Development Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Run ESLint

# Testing
npm test            # Run Vitest tests
npx vitest run src/test/example.test.ts           # Run single test file
npx vitest run --testNamePattern="should pass"   # Run tests matching pattern
npx vitest           # Watch mode
npx playwright test  # E2E tests
```

---

## Code Style Guidelines

### General Principles
- **Minimal diffs** - Only change what's broken or requested
- **Diagnose before editing** - Fix root cause, not symptoms
- **No debug artifacts** - No console.log, no commented-out code, no TODO hacks

### TypeScript
- **Strict mode** - All rules enforced
- **No `any`** - Use `unknown` or proper typing
- **Explicit types** - Define prop interfaces for components

```typescript
interface ButtonProps {
  variant?: "default" | "outline" | "ghost";
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Import Organization
Order imports in groups (blank lines between):
1. React/Next imports
2. Third-party libraries
3. Path aliases (`@/...`)
4. Relative imports (`.` or `..`)

### Component Patterns
- Use functional components with TypeScript interfaces
- Place `"use client"` at top if using client hooks
- Use shadcn/ui components as primitives
- Destructure props with defaults

```typescript
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const HeroSection = ({ title, subtitle, className = "" }: HeroSectionProps) => {
  return (
    <section className={cn("min-h-screen", className)}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
};

export default HeroSection;
```

### Naming Conventions
- **Components:** PascalCase (`HeroSection`)
- **Files:** PascalCase (`.tsx`), camelCase (`.ts`)
- **Props:** `<ComponentName>Props` suffix
- **Booleans:** `is`, `has`, `should`, `enable` prefixes

### Error Handling
- Use try/catch for async operations
- Fail loudly in dev, gracefully in prod
- Provide meaningful error messages

### Styling (Tailwind CSS)
- Use Tailwind utilities exclusively
- Use `cn()` from `@/lib/utils` for conditional classes
- Use shadcn semantic classes (`bg-primary`, `text-muted-foreground`)

```typescript
// Good
<div className={cn("flex items-center", isActive && "bg-primary", className)} />
// Bad
<div style={{ display: "flex" }} />
```

### Data Management
- Artworks and events in `src/data/` (single source of truth)
- Use TypeScript interfaces for data shapes
- Import images directly in data files

---

## Testing Guidelines

### Unit Tests (Vitest)
- Place in `src/test/` directory
- Use `@testing-library/react`

```typescript
import { describe, it, expect } from "vitest";

describe("Example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
```

### E2E Tests (Playwright)
- Use for critical navigation and form features

---

## Important Considerations

1. **Lovable Integration** - Clean code as it may be processed by AI tools
2. **Image Assets** - Large JPGs in `src/assets/`, be mindful of performance
3. **Theme** - CSS variables in `app/globals.css`
4. **Strict TypeScript** - Fix errors, don't use `as` or `any`

---

## File Structure

```
/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   └── events/[id]/      # Dynamic event pages
├── src/
│   ├── assets/           # Images and media
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   ├── data/            # Static data (artworks, events)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities (cn, etc.)
│   └── test/            # Vitest tests
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── eslint.config.js
```
