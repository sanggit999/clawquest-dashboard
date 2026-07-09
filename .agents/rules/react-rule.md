# React Development Rules for AI Agents

This document guides React, Vite, and Shadcn UI development practices.

## 1. Component Rules
- **Functional Components Only**: Always write functional components using arrow functions. Do not use class components.
- **JSX Structuring**:
  - Keep components modular. If a component JSX grows beyond 150 lines, split it into smaller sub-components.
  - Avoid inline styling. Use Tailwind CSS classes.
- **Props**:
  - Destructure props in the function arguments.
  - Define prop types explicitly using TypeScript `interface` or `type`.

## 2. State and Hooks
- **Logic Extraction**: Extract complex UI logic or data fetching into custom hooks (e.g. `useMinerStatus.ts`).
- **State Location**: Lift state up only when necessary. Keep state as close as possible to where it is used to avoid unnecessary re-renders.
- **Side Effects**: Avoid complex dependency arrays in `useEffect`. If possible, handle triggers in event handlers.

## 3. Styling & Shadcn UI
- **Tailwind CSS**: Use standard utility classes. Maintain responsive layout prefixes (`sm:`, `md:`, `lg:`).
- **Shadcn UI**: Integrate Shadcn components under `src/components/ui/`. Customize styling by modifying Tailwind configurations rather than writing custom CSS where possible.
