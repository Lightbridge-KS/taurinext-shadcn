# TauriNext — Shadcn

A production-ready template for building cross-platform applications with Next.js and Tauri. Write once, deploy to web and desktop.

## Features

- **Dual Target**: Build for web (SPA) and desktop (native) from a single codebase
- **Modern Stack**: Next.js 15 (App Router) + React 19 + TypeScript (strict mode)
- **UI Components**: shadcn/ui with Tailwind CSS v3 for beautiful, accessible components
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
- **UI Components**: shadcn/ui (New York style) with Tailwind CSS v3.4.18
- **Desktop**: Tauri v2
- **Icons**: Lucide React
- **Build Mode**: Static Export (CSR only)

## Project Structure

```
taurinext-shadcn/
├── src-next/                  # Next.js application
│   ├── app/                  # App Router
│   │   ├── page.tsx         # Counter app demo
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Tailwind + CSS variables
│   ├── components/           # React components
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                  # Utilities
│   │   └── utils.ts         # cn() helper
│   ├── public/              # Static assets
│   ├── tailwind.config.cjs  # Tailwind v3 config
│   ├── postcss.config.cjs   # PostCSS config
│   └── tsconfig.json        # TypeScript config
├── src-tauri/                # Tauri Rust application
├── components.json           # shadcn/ui config
├── package.json             # Dependencies & scripts
└── out/                     # Build output (gitignored)
```

## Important Notes

This template uses Next.js in **static export mode** for Tauri compatibility:

- ✅ Client-side rendering (CSR)
- ✅ Static site generation at build time
- ✅ Client-side data fetching
- ✅ shadcn/ui components (manually installed)
- ✅ Tailwind CSS v3 with dark mode support
- ❌ No server-side rendering (SSR)
- ❌ No API routes
- ❌ No server components that require runtime

### Demo App

Includes a simple **counter app** showcasing:
- Button component (default, outline, ghost variants)
- Card component with header, content, and footer
- Badge component for count display
- Lucide React icons
- Responsive design with Tailwind utilities

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
