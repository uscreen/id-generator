# @uscreen.de/id-generator

[![CI](https://github.com/uscreen/id-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/uscreen/id-generator/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@uscreen.de%2Fid-generator.svg)](https://badge.fury.io/js/@uscreen.de%2Fid-generator)
[![Known Vulnerabilities](https://snyk.io/test/github/uscreen/id-generator/badge.svg)](https://snyk.io/test/github/uscreen/id-generator)
[![codecov](https://codecov.io/gh/uscreen/id-generator/branch/main/graph/badge.svg)](https://codecov.io/gh/uscreen/id-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate unique, sortable IDs with optional prefixes using ULID.

## Features

- **Unique**: Uses ULID (Universally Unique Lexicographically Sortable Identifier)
- **Sortable**: IDs are lexicographically sortable by timestamp
- **Prefixable**: Add custom prefixes to categorize your IDs
- **Monotonic**: Ensures proper ordering even within the same millisecond
- **Lowercase**: All IDs are returned in lowercase for consistency

## Installation

```bash
pnpm add @uscreen.de/id-generator
```

Or with npm:

```bash
npm install @uscreen.de/id-generator
```

## Usage

```javascript
import { generateId, id, newId } from '@uscreen.de/id-generator'

// Generate a basic ID
const basicId = id()
// → '01hmqr8x3jk9v7n8q2m1c4d5f6'

// Generate an ID with a prefix
const userId = id('user')
// → 'user_01hmqr8x3jk9v7n8q2m1c4d5f6'

const orderId = id('order')
// → 'order_01hmqr8x3jk9v7n8q2m1c4d5f7'

// Use aliases (all do the same thing)
const id1 = generateId('product')
const id2 = newId('category')
```

## API

### `id(prefix?: string): string`

Generates a unique, sortable ID.

**Parameters:**

- `prefix` (optional): String prefix to prepend to the ID, separated by underscore

**Returns:**

- A unique ID string, optionally prefixed

### Aliases

- `generateId(prefix?: string): string` - Alias for `id()`
- `newId(prefix?: string): string` - Alias for `id()`

## Examples

```javascript
import { id } from '@uscreen.de/id-generator'

// Database records
const userId = id('user') // 'user_01hmqr8x3jk9v7n8q2m1c4d5f6'
const postId = id('post') // 'post_01hmqr8x3jk9v7n8q2m1c4d5f7'
const commentId = id('comment') // 'comment_01hmqr8x3jk9v7n8q2m1c4d5f8'

// File names
const fileName = id('upload') // 'upload_01hmqr8x3jk9v7n8q2m1c4d5f9'

// Session IDs
const sessionId = id('session') // 'session_01hmqr8x3jk9v7n8q2m1c4d5fa'

// No prefix
const simpleId = id() // '01hmqr8x3jk9v7n8q2m1c4d5fb'
```

## Why ULID?

ULID combines the best of UUIDs and timestamp-based IDs:

- **128-bit compatibility** with UUID
- **Lexicographically sortable** by timestamp
- **Canonically encoded** as 26 character string (vs 36 for UUID)
- **URL safe** base32 encoding
- **Case insensitive** and **monotonic** within same millisecond

## Requirements

- Node.js 18 or higher
- ES modules support

## License

MIT

## Author

Marcus Spiegel <spiegel@uscreen.de> - published, supported and sponsored by [u|screen](https://uscreen.de)
