# Gemini CLI Project Context: Visual Story Portfolio

This project is a sophisticated artist's portfolio platform built for "Art Jan Elaine A. Ylanan," featuring an interactive gallery, workshop events management, and a modern, high-aesthetic user interface.

## 🛠️ Project Overview

-   **Framework:** Next.js (App Router) + React 18
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
-   **Animations:** Framer Motion
-   **Project Origin:** [Lovable](https://lovable.dev/) (Vite-based structure migrated to Next.js)
-   **Key Features:**
    -   Interactive Artwork Gallery with "Framed" presentation and story-telling components.
    -   Workshop and Artist Talk event management.
    -   Dynamic Theme Toggle (Light/Dark mode).
    -   Smooth scroll navigation with `DotNav`.
    -   Responsive design optimized for high-visual impact.

## 📁 Architecture & Structure

The project follows a hybrid Next.js/Vite structure where the core application logic resides in `src/`, while the Next.js App Router (`app/`) handles routing and page layouts.

```text
/
├── app/                  # Next.js App Router (pages and layouts)
│   ├── events/[id]/      # Dynamic event detail pages
│   └── page.tsx          # Main entry point (Home)
├── src/
│   ├── assets/           # Artworks, profile pictures, and other media
│   ├── components/       # Core React components (Hero, About, Gallery, etc.)
│   │   └── ui/           # Shadcn UI reusable components
│   ├── data/             # Static data for artworks and events (Single Source of Truth)
│   ├── hooks/            # Custom React hooks (e.g., use-mobile, use-toast)
│   ├── lib/              # Utility functions (e.g., clsx/tailwind-merge wrapper)
│   └── test/             # Vitest and Playwright test configurations
├── public/               # Public static assets
├── components.json       # Shadcn UI configuration
└── tailwind.config.ts    # Tailwind CSS styling configuration
```

## 🚀 Key Commands

-   **Development:** `npm run dev` (Starts Next.js dev server)
-   **Build:** `npm run build` (Production-ready Next.js build)
-   **Start:** `npm run start` (Run production build locally)
-   **Linting:** `npm run lint`
-   **Testing:** `npm test` or `npx vitest` (Runs unit tests)
-   **E2E Testing:** `npx playwright test`

## 🎨 Development Conventions

### 1. Component Patterns
-   Prefer **Functional Components** with TypeScript interfaces for props.
-   Use **Shadcn UI** for core UI primitives (Buttons, Dialogs, Cards).
-   Utilize `framer-motion` for subtle, high-quality entrance animations and interactions.

### 2. Data Management
-   Artworks and Events are defined in `src/data/`. When adding new content, update these files first to maintain consistency across the application.
-   Images are imported directly in data files to leverage Next.js/Webpack/Vite asset processing.

### 3. Styling
-   Strictly use **Tailwind CSS** for layout and styling.
-   Follow the existing "Visual Story" aesthetic: high-contrast typography, ample whitespace, and elegant "framed" artwork presentation.
-   Theme-specific colors are handled via CSS variables (see `app/globals.css`).

### 4. Testing
-   Add unit tests in `src/test/` using **Vitest** for logic and component behavior.
-   Ensure UI interactions are verified with **Playwright** if adding critical navigation or form features.

## 🧩 Path Aliases
The project uses `@/*` as the root alias for both `src/` and the project root (as defined in `tsconfig.json`).
-   `@/components/*` -> `src/components/*`
-   `@/lib/*` -> `src/lib/*`
-   `@/assets/*` -> `src/assets/*`
-   `@/data/*` -> `src/data/*`

## ⚠️ Important Considerations
-   **Lovable Integration:** Changes made to this repo are automatically reflected in the Lovable editor. Maintain clean code as it may be processed by Lovable's AI tools.
-   **Image Assets:** Artworks are large JPGs stored in `src/assets/`. Be mindful of performance and optimization.
