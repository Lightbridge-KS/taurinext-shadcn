# TauriNext

A production-ready template for building cross-platform applications with Next.js and Tauri. Write once, deploy to web and desktop.

## Features

- **Dual Target**: Build for web (SPA) and desktop (native) from a single codebase
- **Modern Stack**: Next.js 15 (App Router) + React 19 + TypeScript (strict mode)
- **Desktop Integration**: Tauri v2 for native desktop capabilities
- **Static Export**: CSR-only architecture optimized for both web and desktop
- **Type-Safe**: Full TypeScript support with strict mode enabled
- **Fast Development**: Separate dev modes for web-only and full desktop testing

## Quick Start

### Prerequisites

- Node.js 18+
- Rust 1.70+
- Platform-specific dependencies (see [SETUP.md](./SETUP.md))

### Installation

```bash
# Clone or use as template
git clone <your-repo-url>
cd taurinext

# Install dependencies
npm install
```

### Development

```bash
# Web development (browser only - faster iteration)
npm run dev:next

# Desktop development (full Tauri app)
npm run dev
```

### Build

```bash
# Build desktop application
npm run build

# Build web static export only
npm run build:next
```

## Tech Stack

- **Frontend**: Next.js 15.5.5, React 19.1.0, TypeScript 5
- **Desktop**: Tauri v2
- **Styling**: CSS Modules (customizable)
- **Build Mode**: Static Export (CSR only)

## Project Structure

```
taurinext/
├── src-next/           # Next.js application
│   ├── app/           # App Router
│   └── public/        # Static assets
├── src-tauri/         # Tauri Rust application
└── out/              # Build output (gitignored)
```

## Important Notes

This template uses Next.js in **static export mode** for Tauri compatibility:

- ✅ Client-side rendering (CSR)
- ✅ Static site generation at build time
- ✅ Client-side data fetching
- ❌ No server-side rendering (SSR)
- ❌ No API routes
- ❌ No server components that require runtime

For detailed setup instructions, caveats, and best practices, see [SETUP.md](./SETUP.md).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run Tauri desktop app with hot reload |
| `npm run dev:next` | Run Next.js in browser only (fast UI iteration) |
| `npm run build` | Build production desktop application |
| `npm run build:next` | Build Next.js static export |
| `npm run lint` | Run ESLint |

## Documentation

- [SETUP.md](./SETUP.md) - Complete setup guide and troubleshooting
- [CLAUDE.md](./CLAUDE.md) - Architecture context for AI assistants


## Use as Template

Click "Use this template" on GitHub to create your own repository, or clone and customize as needed.
