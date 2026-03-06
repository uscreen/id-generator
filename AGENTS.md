# Agent Guidelines

Guidelines for AI coding agents working in this repository.

## Project Overview

Small npm package (`@uscreen.de/id-generator`) that generates unique, sortable IDs
using ULID with optional prefixes. Ships raw ES module JavaScript with separate
TypeScript declarations -- no build step.

- **Runtime**: Node.js >= 18
- **Module system**: ES modules (`"type": "module"` in package.json)
- **Package manager**: pnpm (version managed via Corepack, see `packageManager` field)
- **Single production dependency**: `ulid`

## Commands

### Testing

```bash
pnpm test              # Run all tests with c8 coverage (spec reporter)
pnpm test:cov          # Run tests with HTML + text + lcov coverage reports
pnpm test:ci           # Run tests without coverage (CI mode, fast)
```

Run a single test by name using Node.js test runner `--test-name-pattern`:

```bash
node --test --test-name-pattern="with prefix" test.js
```

Run tests matching a file pattern (not applicable here since there is only `test.js`):

```bash
node --test test.js
```

The test runner is Node.js built-in (`node:test`). There is no separate test
framework. Tests live in a single file: `test.js`.

### Linting

```bash
pnpm lint              # Check for lint errors
pnpm lint:fix          # Auto-fix lint errors (includes formatting)
```

ESLint handles both linting and formatting (no Prettier). Always run `pnpm lint:fix`
after making changes.

### Pre-publish

```bash
pnpm prepublishOnly    # Runs lint + test (must pass before npm publish)
```

## Code Style

### Formatting (enforced by ESLint)

- **No trailing commas** -- `style/comma-dangle: ['error', 'never']`
- **Single quotes** for strings (antfu default)
- **No semicolons** (antfu default)
- **2-space indentation** (antfu default)
- **Curly braces**: required for multi-line blocks, must be consistent within an
  if/else chain -- `curly: ['error', 'multi-line', 'consistent']`
- **Console**: `console.log` and similar are allowed (`no-console: off`)

### Imports

- ES modules only -- use `import`/`export`, never `require()`
- Node.js built-ins MUST use the `node:` prefix:
  ```js
  import assert from 'node:assert/strict'
  import { describe, test } from 'node:test'
  ```
- Group imports: external packages first, then local modules, separated by a
  blank line:
  ```js
  import { distance } from 'fastest-levenshtein'

  import { id } from './index.js'
  ```
- Always include `.js` extension in relative imports

### Functions

- Use `export const name = (...) => { }` for public API functions (arrow functions)
- The `antfu/top-level-function` rule is disabled -- arrow functions are fine at
  top level
- Create aliases by re-exporting: `export const generateId = id`

### Types

- TypeScript declarations live in separate `.d.ts` files (not inline JSDoc types)
- The `.d.ts` files are excluded from ESLint via `eslint.config.js`
- Use `export declare function` syntax in declaration files
- Keep type declarations in sync with the JS implementation

### Naming Conventions

- **Functions/variables**: camelCase (`id`, `generateId`, `monotonicFactory`)
- **Constants**: camelCase (not UPPER_SNAKE_CASE)
- **File names**: lowercase, no special casing (`index.js`, `test.js`)
- **Test descriptions**: descriptive strings starting with the module name
  (e.g., `'id generator with prefix'`)

### Comments

- JSDoc `/** */` blocks for public API functions (brief, one-liner descriptions)
- Minimal inline comments -- only when intent is non-obvious
- Section separator comments for logical groupings (e.g., `/** alias exports */`)

### Error Handling

- Use `node:assert/strict` for test assertions (`assert.ok`, `assert.strictEqual`)
- Prefer explicit boolean checks over truthy/falsy where possible
- No try/catch in this codebase -- the library functions are synchronous and
  do not throw under normal usage

## Testing Patterns

Tests use Node.js built-in test runner with `describe`/`test` blocks:

```js
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

describe('feature name', async () => {
  test('specific behavior', async () => {
    // arrange
    const result = someFunction()
    // assert
    assert.ok(result)
    assert.strictEqual(result, expected)
  })
})
```

Key patterns observed in `test.js`:
- All test callbacks are `async` functions
- `describe` callback is also `async`
- Use `scheduler.wait(ms)` from `node:timers/promises` for timing-sensitive tests
- Use third-party `fastest-levenshtein` for distance assertions on uniqueness
- Tests verify: correctness, edge cases, sortability, and performance (100k IDs)

## File Structure

```
index.js           Main implementation (ES module, ~18 lines)
index.d.ts         TypeScript type declarations
test.js            All tests (Node.js test runner)
eslint.config.js   ESLint flat config (antfu + custom rules)
package.json       Package metadata, scripts, dependencies
.nvmrc             Node.js version for local dev (24)
.github/
  workflows/
    ci.yml         CI pipeline (Node 20/22/24, lint, test, coverage)
    codeql.yml     GitHub CodeQL security scanning
  dependabot.yml   Automated dependency updates
```

## CI

- Tests run on Node.js 20, 22, and 24
- Linting runs on Node 20+
- Coverage (c8) generated on Node 22, uploaded to Codecov
- Uses Corepack for pnpm version management
- `pnpm install --frozen-lockfile` in CI (lockfile must be up to date)

## Dependencies Policy

- Keep production dependencies minimal (currently only `ulid`)
- Dev dependencies: ESLint ecosystem (`@antfu/eslint-config`, `eslint`,
  `eslint-plugin-format`), coverage (`c8`), test utilities (`fastest-levenshtein`)
- Use caret ranges (`^`) for version specifiers
- Dependabot groups: `dev-dependencies` and `production-dependencies`

## Common Pitfalls

- Do NOT add trailing commas -- the linter will reject them
- Do NOT use `require()` -- this is an ES module package
- Do NOT forget the `node:` prefix on Node.js built-in imports
- Do NOT add semicolons -- antfu config enforces no-semicolons
- Always include `.js` extension in relative import paths
- Run `pnpm lint:fix` before committing to ensure formatting is correct
