# Git and Branching Rules for AI Agents

To maintain clean and traceable project history, all agents must adhere to these Git protocols.

## 1. Branch Naming Strategy
Branches should be named with appropriate prefixes depending on the work being done:
- **Features**: `feature/feature-name` (e.g. `feature/miner-dashboard`)
- **Bug fixes**: `bugfix/issue-name` (e.g. `bugfix/stamina-refill-error`)
- **Documentation**: `docs/topic-name` (e.g. `docs/mcp-setup`)
- **Refactoring**: `refactor/component-name` (e.g. `refactor/layout-grid`)

## 2. Commit Messages (Conventional Commits)
All commit messages must follow the Conventional Commits specification:
- `feat`: A new feature (e.g., `feat(ui): add stamina monitor bar`)
- `fix`: A bug fix (e.g., `fix(api): handle timeout error gracefully`)
- `docs`: Documentation only changes (e.g., `docs(readme): update deployment guide`)
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools/libraries

Format: `<type>(<scope>): <short description>`

## 3. Pull Request and Merging
- Always merge into `develop` first (or `main` if it is a direct patch).
- Ensure CI build passes before requesting review/merging.
- Squash commits when merging to maintain a clean main history.
