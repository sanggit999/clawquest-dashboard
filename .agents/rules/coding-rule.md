# General Coding Rules for AI Agents

Welcome to this codebase! As an AI agent working on this project, you must strictly follow these rules to ensure the codebase remains clean, maintainable, and robust.

## 1. Naming Conventions
- **Files and Folders**:
  - React Component files: `PascalCase` (e.g. `Button.tsx`, `Header.tsx`).
  - Directories: `camelCase` (e.g., `services/`, `customHooks/`).
  - Logic/Helper/Hook files: `camelCase` (e.g., `useAuth.ts`, `dateFormatter.ts`).
- **Variables and Functions**:
  - Constants: `UPPER_CASE_SNAKE` (e.g., `MAX_RETRY_COUNT`, `API_URL`).
  - Variables, Hooks, Functions: `camelCase` (e.g., `isLoading`, `useAuth`, `fetchUserData()`).
- **Types and Interfaces**:
  - Types/Interfaces/Enums: `PascalCase` (e.g., `UserType`, `MinerStatus`).
  - Do NOT prefix Interfaces with "I" (e.g., use `MinerConfig`, not `IMinerConfig`).

## 2. TypeScript and Safety
- Always enforce strict type safety. Avoid using `any`. If type is unknown, use `unknown`.
- Use TypeScript interfaces or types for all component props.
- Ensure null/undefined safety by using optional chaining (`?.`) and nullish coalescing (`??`).

## 3. Clean Code Principles
- **DRY (Don't Repeat Yourself)**: Avoid duplicating code. If a logic block is used in multiple places, extract it to a helper or custom hook.
- **SRP (Single Responsibility Principle)**: A function or component should do one thing and do it well. Keep files under 250 lines if possible.
- **Clean Functions**: Keep functions short. Avoid deep nesting (maximum 3 levels). Use early returns.
