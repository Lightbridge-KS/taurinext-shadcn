# Setup Guide

This guide covers everything you need to know to set up and develop with the TauriNext template.

## Prerequisites

### Required

- **Node.js** 18.x or later
- **npm** 9.x or later
- **Rust** 1.70 or later (for Tauri)
- **System dependencies** for Tauri (see [Tauri Prerequisites](https://tauri.app/start/prerequisites/))

### Platform-Specific Requirements

**macOS:**
- Xcode Command Line Tools: `xcode-select --install`

**Windows:**
- Microsoft Visual Studio C++ Build Tools
- WebView2 (usually pre-installed on Windows 10/11)

**Linux:**
- See [Tauri Linux Prerequisites](https://tauri.app/start/prerequisites/#linux)

## Installation

1. Clone or use this template:
   ```bash
   git clone <your-repo-url>
   cd taurinext
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify Tauri setup:
   ```bash
   npm run tauri info
   ```

## Project Structure

```
taurinext/
 src-next/           # Next.js application
    app/           # Next.js App Router
    public/        # Static assets
    next.config.ts # Next.js configuration
    tsconfig.json  # TypeScript config for Next.js
 src-tauri/         # Tauri Rust application
    src/           # Rust source code
    icons/         # Application icons
    Cargo.toml     # Rust dependencies
    tauri.conf.json # Tauri configuration
 package.json       # npm scripts and dependencies
 out/              # Next.js static export output (gitignored)
```

## Development Workflow

### Web Development (Browser Only)

For fast iteration on UI/UX without launching the desktop app:

```bash
npm run dev:next
```

This runs Next.js dev server at `http://localhost:3000` in your browser.

**Use this when:**
- Working on UI components
- Styling and layout
- Testing responsive design
- Fast refresh is needed

### Desktop Development (Full Stack)

To run the complete Tauri desktop application:

```bash
npm run dev
```

This builds the Next.js app and launches it in a Tauri window.

**Use this when:**
- Testing Tauri-specific features
- Using Tauri APIs (file system, notifications, etc.)
- Testing desktop window behavior
- Final integration testing

## Building for Production

### Build Web Static Export Only

```bash
npm run build:next
```

Output: `src-next/out/` directory with static HTML, CSS, and JS files.

### Build Desktop Application

```bash
npm run build
```

This will:
1. Run `npm run build:next` to generate static files
2. Bundle them into a native desktop application

Output location varies by platform:
- **macOS**: `src-tauri/target/release/bundle/dmg/`
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **Linux**: `src-tauri/target/release/bundle/deb/` or `appimage/`

## Critical Caveats

###  Client-Side Rendering (CSR) Only

This template uses Next.js in **static export mode** for Tauri compatibility.

**What this means:**
-  No Server-Side Rendering (SSR)
-  No Incremental Static Regeneration (ISR)
-  No API Routes (`app/api/`)
-  No Server Components features that require runtime server
-  No `revalidate`, `generateStaticParams`, or other dynamic SSG features
-  Static Site Generation (SSG) at build time only
-  Client-side data fetching (SWR, React Query, etc.)
-  All interactivity via client-side JavaScript

###  TypeScript Configuration

- **Strict mode enabled** by default
- **No `any` types** - use explicit typing
- Located at `src-next/tsconfig.json`

###  Next.js Image Component

Images are **unoptimized** in this setup:

```typescript
// next.config.ts
images: {
  unoptimized: true,
}
```

**Why:** Next.js Image optimization requires a server runtime. In static export mode, images are served as-is.

**Recommendation:** Optimize images before adding them to the project using tools like ImageOptim, Squoosh, or Sharp.

###  Font Loading

Google Fonts (via `next/font/google`) work correctly in static export mode:
- Fonts are downloaded at build time
- Embedded as static assets
- No runtime server needed

**Layout component** should NOT have `'use client'` directive if using `metadata` export.

###  Routing

Use Next.js App Router (`src-next/app/`):
- File-based routing works normally
- Client-side navigation via `<Link>` and `useRouter()`
- Dynamic routes (`[id]`) work but must be statically generated at build time

###  Environment Variables

Only variables prefixed with `NEXT_PUBLIC_` are available in the browser:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com  #  Available
SECRET_KEY=xyz123                             # L Not available (server-only)
```

## Configuration Files

### `src-next/next.config.ts`

Key settings:
```typescript
output: 'export',              // Enable static export
images: { unoptimized: true }, // Disable image optimization
assetPrefix: ...               // Asset path handling for dev/prod
```

### `src-tauri/tauri.conf.json`

Key settings:
```json
{
  "build": {
    "beforeDevCommand": "npm run dev:next",
    "beforeBuildCommand": "npm run build:next",
    "frontendDist": "../src-next/out"
  }
}
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run Tauri desktop app with Next.js dev server |
| `npm run dev:next` | Run Next.js in browser only (fast iteration) |
| `npm run build` | Build production desktop application |
| `npm run build:next` | Build Next.js static export to `out/` |
| `npm run lint` | Run ESLint on Next.js code |
| `npm run tauri` | Access Tauri CLI directly |

## Common Issues

### Build fails with "beforeBuildCommand failed"

**Cause:** Next.js build errors.

**Solution:**
1. Run `npm run build:next` separately to see detailed errors
2. Check for SSR-specific features in your code
3. Ensure all components that need interactivity have `'use client'`

### Images not displaying in desktop app

**Cause:** Image paths or optimization issues.

**Solution:**
1. Place images in `src-next/public/`
2. Reference as `/image.png` (not `./image.png`)
3. Ensure `images.unoptimized: true` in `next.config.ts`

### "Cannot export metadata from 'use client'"

**Cause:** `'use client'` directive in layout with metadata export.

**Solution:**
- Remove `'use client'` from `layout.tsx`
- Keep `'use client'` only in components that need interactivity
- `metadata` export only works in Server Components

### Desktop app shows blank screen

**Cause:** Incorrect asset paths or CSP issues.

**Solution:**
1. Check browser console in Tauri (Cmd+Option+I on macOS)
2. Verify `frontendDist` path in `tauri.conf.json`
3. Check `assetPrefix` in `next.config.ts`
4. Review CSP settings in `tauri.conf.json` if needed

## Best Practices

1. **Use `'use client'` sparingly** - Only add it to components that use hooks or event handlers
2. **Pre-optimize images** - Since optimization is disabled, optimize before adding
3. **Client-side data fetching** - Use libraries like SWR or TanStack Query
4. **Test both targets** - Regularly test both web (`dev:next`) and desktop (`dev`)
5. **TypeScript strict mode** - Embrace it for better code quality
6. **Avoid SSR patterns** - Don't use `getServerSideProps`, API routes, or Server Actions

## Further Reading

- [Tauri Documentation](https://tauri.app/)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tauri + Next.js Guide](https://tauri.app/develop/integrate/nextjs/)
