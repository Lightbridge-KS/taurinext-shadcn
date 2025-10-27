# TauriNext - Context for AI Assistants

This document provides context for AI assistants (like Claude) working on this codebase.

## Project Architecture

**TauriNext** is a template for building cross-platform applications that run as:
1. **Web app** (SPA in browser)
2. **Desktop app** (native via Tauri)

Both targets share the same Next.js codebase.

### Tech Stack

- **Frontend Framework**: Next.js 15.5.5 (App Router)
- **UI Library**: React 19.1.0
- **Desktop Runtime**: Tauri v2
- **Language**: TypeScript (strict mode)
- **Build Mode**: Static Export (CSR only, NO SSR)

## Critical Constraints

### 1. Static Export Mode Only

Next.js is configured with `output: 'export'` for Tauri compatibility.

**What this means:**
```typescript
// next.config.ts
output: 'export',  // ← Forces static HTML generation
```

**Allowed:**
- ✅ Client Components with `'use client'`
- ✅ Static generation at build time
- ✅ Client-side routing
- ✅ Client-side data fetching (fetch, SWR, React Query)
- ✅ Static assets in `public/`

**NOT Allowed:**
- ❌ Server Components that require runtime server
- ❌ API Routes (`app/api/*`)
- ❌ Server Actions
- ❌ `getServerSideProps`, `getStaticProps` (Pages Router features)
- ❌ Incremental Static Regeneration (ISR)
- ❌ `revalidate` or dynamic rendering
- ❌ Middleware
- ❌ Edge Runtime

### 2. TypeScript Strict Mode

**All code must:**
- Use explicit types (no `any`)
- Handle null/undefined properly
- Pass strict type checking

```json
// src-next/tsconfig.json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
```

### 3. Image Handling

Images are **unoptimized** (no Next.js Image Optimization API):

```typescript
images: {
  unoptimized: true,  // ← Required for static export
}
```

**When working with images:**
- Use `next/image` component normally
- Images will NOT be optimized at runtime
- Pre-optimize images before adding to project
- Images must be in `src-next/public/`

## Directory Structure

```
taurinext/
├── src-next/                    # Next.js application
│   ├── app/                     # App Router
│   │   ├── layout.tsx          # Root layout (Server Component)
│   │   ├── page.tsx            # Home page (Client Component)
│   │   ├── globals.css         # Global styles
│   │   └── page.module.css     # Component styles
│   ├── public/                 # Static assets (served at root)
│   ├── next.config.ts          # Next.js config (CRITICAL FILE)
│   ├── tsconfig.json           # TypeScript config for Next.js
│   └── eslint.config.mjs       # ESLint config
│
├── src-tauri/                  # Tauri Rust application
│   ├── src/                    # Rust source code
│   ├── icons/                  # Desktop app icons
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri config (CRITICAL FILE)
│
├── out/                        # Next.js build output (gitignored)
├── package.json                # npm scripts & dependencies
└── .gitignore                  # Includes Next.js build artifacts
```

## Build Pipeline

### Development Mode

**Option 1: Desktop App**
```bash
npm run dev
```
Flow:
1. Tauri reads `tauri.conf.json`
2. Runs `beforeDevCommand`: `npm run dev:next`
3. Next.js dev server starts at `http://localhost:3000`
4. Tauri window opens pointing to `devUrl`

**Option 2: Web Only**
```bash
npm run dev:next
```
Flow:
1. Next.js dev server at `http://localhost:3000`
2. No Tauri window (browser only)
3. Faster iteration for UI development

### Production Build

```bash
npm run build
```
Flow:
1. Tauri reads `tauri.conf.json`
2. Runs `beforeBuildCommand`: `npm run build:next`
3. Next.js generates static files to `src-next/out/`
4. Tauri bundles files from `frontendDist: "../src-next/out"`
5. Creates platform-specific installer

## Key Configuration Files

### `src-next/next.config.ts`

```typescript
const isProd = process.env.NODE_ENV === 'production';
const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

const nextConfig = {
  output: 'export',          // ← MUST be 'export' for Tauri
  images: {
    unoptimized: true,       // ← MUST be true for static export
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
};
```

**DO NOT change:**
- `output: 'export'`
- `images.unoptimized: true`

### `src-tauri/tauri.conf.json`

```json
{
  "build": {
    "beforeDevCommand": "npm run dev:next",
    "beforeBuildCommand": "npm run build:next",
    "frontendDist": "../src-next/out",
    "devUrl": "http://localhost:3000"
  }
}
```

**Key points:**
- `frontendDist` must point to Next.js output directory
- Commands must match package.json scripts

### `package.json`

```json
{
  "scripts": {
    "dev": "tauri dev",              // Desktop app with hot reload
    "dev:next": "cd src-next && next dev",  // Web-only dev mode
    "build": "tauri build",          // Build desktop app
    "build:next": "cd src-next && next build"  // Build static export
  }
}
```

**Script naming convention:**
- Base command: Full Tauri app
- `:next` suffix: Next.js-specific

## Common Development Tasks

### Adding a New Page

1. Create `src-next/app/newpage/page.tsx`:
```tsx
'use client';

export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add navigation:
```tsx
import Link from 'next/link';

<Link href="/newpage">Go to New Page</Link>
```

### Adding Client-Side Data Fetching

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

### Using Tauri APIs

```tsx
'use client';

import { invoke } from '@tauri-apps/api/core';

export default function TauriFeature() {
  const handleClick = async () => {
    const result = await invoke('greet', { name: 'World' });
    console.log(result);
  };

  return <button onClick={handleClick}>Call Tauri</button>;
}
```

### Adding Environment Variables

1. Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

2. Use in code:
```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Remember:** Only `NEXT_PUBLIC_*` variables are available in browser.

## What NOT to Do

### ❌ Don't Add API Routes

```tsx
// ❌ This will NOT work
// app/api/users/route.ts
export async function GET() {
  return Response.json({ users: [] });
}
```

**Why:** API routes require a Node.js server. Use external APIs or Tauri commands instead.

### ❌ Don't Use Server-Only Features

```tsx
// ❌ This will NOT work
import fs from 'fs';

export default function Page() {
  const data = fs.readFileSync('file.txt');
  return <div>{data}</div>;
}
```

**Why:** No Node.js runtime in static export. Use Tauri APIs for file system access.

### ❌ Don't Export Metadata from Client Components

```tsx
// ❌ This will cause build error
'use client';

export const metadata = {
  title: 'My Page'
};
```

**Why:** Metadata only works in Server Components.

### ❌ Don't Add `'use client'` to Layout with Metadata

```tsx
// ❌ Wrong
'use client';

export const metadata = { title: 'App' };

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
```

```tsx
// ✅ Correct
export const metadata = { title: 'App' };

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
```

## Debugging

### Check Build Output

```bash
npm run build:next
cd src-next
ls -la out/
```

Should see:
- `index.html`
- `_next/` directory with static assets
- Other HTML files for routes

### Common Build Errors

**Error: "You're trying to use a Server Component feature..."**
- Check if component needs `'use client'`
- Remove server-only imports
- Use client-side alternatives

**Error: "Cannot export metadata from 'use client'"**
- Remove `'use client'` from layout
- Move metadata to Server Component

**Error: "API routes are not supported"**
- Remove `app/api/` directory
- Use external API or Tauri commands

## Summary

**Remember when working on this codebase:**
1. This is CSR-only (no SSR)
2. `output: 'export'` is non-negotiable
3. No API routes or server features
4. TypeScript strict mode enforced
5. Two build targets: web + desktop
6. Images are unoptimized
7. Only `NEXT_PUBLIC_*` env vars work

**When in doubt:** Check if the feature works with Next.js static export.
