# Agent Guidelines

## Commands

- **Test**: `pnpm test` (all tests), `pnpm test:cov` (with coverage), `pnpm test:ci` (CI mode)
- **Lint**: `pnpm lint` (check), `pnpm lint:fix` (fix issues)
- **Pre-publish**: `pnpm prepublishOnly` (runs lint + test)

## Code Style

- **ESLint**: Uses @antfu/eslint-config with formatters enabled
- **Comma dangle**: Never use trailing commas
- **Curly braces**: Multi-line and consistent
- **Console**: Console statements allowed
- **Imports**: ES modules only (`import`/`export`)
- **Node built-ins**: Use `node:` prefix (e.g., `node:assert/strict`)

## Patterns

- **Functions**: Export named functions, use arrow functions for internal logic
- **Testing**: Node.js built-in test runner with `describe`/`test` structure
- **Types**: TypeScript declarations in separate `.d.ts` files
- **Dependencies**: Use exact versions, minimal deps (only `ulid` in production)
- **Error handling**: Use `assert` for testing, prefer explicit checks
- **Comments**: JSDoc for public APIs, minimal inline comments

## File Structure

- `index.js` - Main implementation (ES modules)
- `index.d.ts` - TypeScript declarations
- `test.js` - All tests using Node.js test runner
- Package manager: pnpm (Node.js 18+)
