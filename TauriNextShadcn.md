# TauriNext-shadcn

Complete technical reference for the TauriNext-shadcn template.

## Project Architecture

**TauriNext-shadcn** is a production-ready template for building cross-platform applications that run as:

1. **Web app** (SPA in browser)
2. **Desktop app** (native via Tauri)

Both targets share the same Next.js codebase with **shadcn/ui** components for a beautiful, accessible UI.

### Tech Stack

- **Frontend Framework**: Next.js 15.5.5 (App Router)
- **UI Library**: React 19.1.0
- **Component System**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS v3.4.18 (NOT v4)
- **Icons**: Lucide React
- **Desktop Runtime**: Tauri v2
- **Language**: TypeScript (strict mode)
- **Build Mode**: Static Export (CSR only, NO SSR)

### Demo Application

The template includes a **counter app** demonstrating:
- **Button component** - Multiple variants (default, outline, ghost)
- **Card component** - Header, Content, Footer composition
- **Badge component** - Count display with styling
- **Icons** - Lucide React integration (Plus, Minus, RotateCcw)
- **State management** - React useState hooks
- **Responsive design** - Tailwind utility classes

## Critical Constraints

### 1. Static Export Mode Only

Next.js is configured with `output: 'export'` for Tauri compatibility.

**Allowed:**
- ✅ Client Components with `'use client'`
- ✅ Static generation at build time
- ✅ Client-side routing
- ✅ Client-side data fetching (fetch, SWR, React Query)
- ✅ Static assets in `public/`
- ✅ Tailwind CSS with JIT compilation
- ✅ shadcn/ui components (manually installed)

**NOT Allowed:**
- ❌ Server Components that require runtime server
- ❌ API Routes (`app/api/*`)
- ❌ Server Actions
- ❌ SSR, ISR, or dynamic rendering
- ❌ Middleware
- ❌ Edge Runtime

### 2. Tailwind CSS v3 (Not v4)

**Critical:** Must use Tailwind CSS v3.4.x, NOT v4.x

**Why:**
- shadcn/ui is built for Tailwind v3
- Tailwind v4 uses completely different configuration format
- v4 incompatible with current shadcn/ui components

**Package versions:**
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.18",        // ✅ Correct
    "tailwindcss-animate": "^1.0.7"   // ✅ Required plugin
  }
}
```

### 3. CommonJS Config Files in `src-next/`

**Critical configuration requirement:**

**Location:** All Tailwind/PostCSS configs must be in `src-next/` directory (NOT root)

**Format:** Must use `.cjs` extension (CommonJS), NOT `.js`

**Why:**
- Root `package.json` has `"type": "module"`
- Next.js runs from `src-next/` directory (`cd src-next && next dev`)
- PostCSS loader requires CommonJS format
- `.cjs` explicitly forces CommonJS module system

**Required files:**
```
src-next/
├── tailwind.config.cjs   ← Must be .cjs in src-next/
├── postcss.config.cjs    ← Must be .cjs in src-next/
└── ...
```

### 4. TypeScript Strict Mode

**All code must:**
- Use explicit types (no `any`)
- Handle null/undefined properly
- Pass strict type checking

```json
// src-next/tsconfig.json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true
```

### 5. Image Handling

Images are **unoptimized** (no Next.js Image Optimization API):

```typescript
// next.config.ts
images: {
  unoptimized: true,  // Required for static export
}
```

**Best practice:** Pre-optimize images before adding to project.

## Directory Structure

```
taurinext-shadcn/
├── src-next/                      # Next.js application
│   ├── app/                       # App Router
│   │   ├── layout.tsx             # Root layout (Server Component)
│   │   ├── page.tsx               # Counter app (Client Component)
│   │   ├── globals.css            # Tailwind + CSS variables
│   │   └── favicon.ico
│   ├── components/                # React components
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx         # Button component
│   │       ├── card.tsx           # Card component
│   │       └── badge.tsx          # Badge component
│   ├── lib/                       # Utility functions
│   │   └── utils.ts               # cn() helper for class merging
│   ├── public/                    # Static assets
│   ├── tailwind.config.cjs        # Tailwind v3 config (CommonJS)
│   ├── postcss.config.cjs         # PostCSS config (CommonJS)
│   ├── next.config.ts             # Next.js config
│   ├── tsconfig.json              # TypeScript config
│   └── eslint.config.mjs
│
├── src-tauri/                     # Tauri Rust application
│   ├── src/                       # Rust source code
│   ├── icons/                     # Desktop app icons
│   ├── Cargo.toml                 # Rust dependencies
│   └── tauri.conf.json            # Tauri config
│
├── components.json                # shadcn/ui CLI configuration
├── package.json                   # Dependencies & scripts
├── .gitignore
└── out/                          # Build output (gitignored)
```

## shadcn/ui Integration

### Configuration

**`components.json`** (root level):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "src-next/tailwind.config.cjs",
    "css": "src-next/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Installed Components

**Button** (`src-next/components/ui/button.tsx`):
- Dependencies: `@radix-ui/react-slot`
- Variants: default, outline, ghost, destructive, secondary, link
- Sizes: default, sm, lg, icon
- Supports `asChild` prop for polymorphic rendering

**Card** (`src-next/components/ui/card.tsx`):
- No external dependencies
- Exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Composable structure

**Badge** (`src-next/components/ui/badge.tsx`):
- No external dependencies
- Variants: default, secondary, destructive, outline

### Manual Component Installation

The shadcn CLI doesn't work with this template's custom directory structure. Install components manually:

**Steps:**

1. **Find component** at https://ui.shadcn.com/docs/components/[name]

2. **Check dependencies** in the component code (e.g., `@radix-ui` packages)

3. **Install dependencies**:
   ```bash
   npm install @radix-ui/react-dialog  # Example
   ```

4. **Create file** in `src-next/components/ui/[name].tsx`

5. **Copy component code** from shadcn docs

6. **Verify imports** use `@/` path aliases:
   ```tsx
   import { cn } from "@/lib/utils"  // ✅ Correct
   ```

### Styling System

**CSS Variables** (in `src-next/app/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;      /* HSL: white */
    --foreground: 0 0% 3.9%;      /* HSL: near-black */
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    /* ... more colors */
  }

  .dark {
    --background: 0 0% 3.9%;       /* HSL: dark gray */
    --foreground: 0 0% 98%;        /* HSL: near-white */
    /* ... dark mode colors */
  }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

**Tailwind Color Mappings** (in `src-next/tailwind.config.cjs`):

```javascript
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more color mappings
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

**This enables:**
- `bg-background` → Uses CSS variable `--background`
- `text-primary` → Uses CSS variable `--primary`
- `border-border` → Uses CSS variable `--border`

### Utility Functions

**`src-next/lib/utils.ts`**:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Purpose:**
- Merges Tailwind classes intelligently
- Handles conditional classes
- Resolves conflicts (later classes win)

**Usage:**
```tsx
<div className={cn(
  "base-class",
  condition && "conditional-class",
  className  // From props
)} />
```

## Build Pipeline

### Development Mode

**Option 1: Web Only (Fast Iteration)**
```bash
npm run dev:next
```

Flow:
1. Changes to `src-next/` directory
2. Runs `next dev` from inside `src-next/`
3. Next.js finds `tailwind.config.cjs` and `postcss.config.cjs`
4. Tailwind processes CSS with JIT compilation
5. Dev server at `http://localhost:3000`

**Option 2: Desktop App**
```bash
npm run dev
```

Flow:
1. Tauri runs `beforeDevCommand`: `npm run dev:next`
2. Opens Tauri window pointing to `http://localhost:3000`
3. Same as web mode but in native window

### Production Build

```bash
npm run build
```

Flow:
1. Tauri runs `beforeBuildCommand`: `npm run build:next`
2. Next.js generates static files to `src-next/out/`:
   - `index.html`
   - `_next/static/` (JS, CSS, chunks)
   - Tailwind CSS compiled and minified
3. Tauri bundles from `frontendDist: "../src-next/out"`
4. Creates platform-specific installer

## Component Usage Examples

### Basic Button

```tsx
'use client';

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <Button>Click Me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost" size="sm">Small Ghost</Button>
    </div>
  );
}
```

### Card with Content

```tsx
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### Badge Variants

```tsx
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
```

### Icons with Lucide

```tsx
'use client';

import { Button } from "@/components/ui/button";
import { Plus, Trash, Settings } from "lucide-react";

export default function Page() {
  return (
    <div className="flex gap-2">
      <Button>
        <Plus className="h-4 w-4" />
        Add Item
      </Button>
      <Button variant="destructive" size="icon">
        <Trash className="h-4 w-4" />
      </Button>
      <Button variant="ghost">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  );
}
```

## Dark Mode Implementation

Dark mode is configured but not automatically toggled. Implement manually:

### Simple Toggle

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
```

### Using next-themes (Recommended)

1. Install:
   ```bash
   npm install next-themes
   ```

2. Create provider:
   ```tsx
   // components/theme-provider.tsx
   'use client';

   import { ThemeProvider as NextThemesProvider } from "next-themes";
   import type { ThemeProviderProps } from "next-themes/dist/types";

   export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
     return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
   }
   ```

3. Add to layout:
   ```tsx
   // app/layout.tsx
   import { ThemeProvider } from "@/components/theme-provider";

   export default function RootLayout({ children }) {
     return (
       <html lang="en" suppressHydrationWarning>
         <body>
           <ThemeProvider
             attribute="class"
             defaultTheme="system"
             enableSystem
           >
             {children}
           </ThemeProvider>
         </body>
       </html>
     );
   }
   ```

## Common Development Tasks

### Adding Client-Side Data Fetching

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Data {
  id: number;
  title: string;
}

export default function Page() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {data.map(item => (
        <Card key={item.id}>
          <CardContent className="p-4">
            {item.title}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Using Tauri APIs

```tsx
'use client';

import { invoke } from '@tauri-apps/api/core';
import { Button } from '@/components/ui/button';

export default function TauriFeature() {
  const handleClick = async (): Promise<void> => {
    try {
      const result = await invoke<string>('greet', { name: 'World' });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>Call Tauri Command</Button>;
}
```

## Troubleshooting

### Tailwind Styles Not Applying

**Symptoms:** Components render but have no styling, look like plain HTML.

**Cause:** Config files not found or wrong format.

**Solution:**
1. Verify file locations:
   ```bash
   ls src-next/tailwind.config.cjs
   ls src-next/postcss.config.cjs
   ```
2. Check both use `.cjs` extension
3. Verify `globals.css` has:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Clear cache and restart:
   ```bash
   rm -rf src-next/.next
   npm run dev:next
   ```

### Component Import Errors

**Error:** `Cannot find module '@/components/ui/button'`

**Solution:**
1. Check file exists: `src-next/components/ui/button.tsx`
2. Verify `tsconfig.json` paths:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```
3. Restart TypeScript server in VS Code

### Tailwind v4 Accidentally Installed

**Error:** Config syntax not working, `@import` directives in CSS.

**Solution:**
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.18
```

### Dark Mode Not Working

**Solution:**
1. Verify `darkMode: ["class"]` in `tailwind.config.cjs`
2. Check `.dark` CSS variables in `globals.css`
3. Ensure `dark` class is toggled on `<html>` element

## Best Practices

1. **Always use `'use client'`** for components with interactivity
2. **Keep configs in `src-next/`** with `.cjs` extension
3. **Use Tailwind v3**, never upgrade to v4
4. **Install shadcn components manually** - CLI doesn't work
5. **Pre-optimize images** before adding to project
6. **Use `cn()` utility** for conditional classes
7. **Test both web and desktop** modes regularly
8. **Follow TypeScript strict mode** - no `any` types

## Summary

**Critical Facts:**
- CSR-only, no SSR
- Tailwind CSS v3.4.x (NOT v4)
- Configs must be `.cjs` in `src-next/`
- shadcn/ui components manually installed
- Two build targets: web + desktop
- TypeScript strict mode enforced
- Dark mode configured but not auto-toggled

**When in doubt:** Check if the feature works with Next.js static export and Tailwind v3.
