# TauriNext-shadcn

This document provides context for AI assistants (like Claude) working on this codebase.

## SKILLS

These are skills in this codebase:

- `taurinext-shadcn`: Use this when to find in-depth information about `taurinext-shadcn` template.

## Project Architecture

This TauriNext-shadcn is a template repository for building cross-platform applications that run as:

1. **Web app** (SPA in browser)
2. **Desktop app** (native via Tauri)

Both targets share the same Next.js codebase with **shadcn/ui** components.

### Tech Stack

- **Frontend Framework**: Next.js 15.5.5 (App Router)
- **UI Library**: React 19.1.0
- **Component System**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS v3.4.18 (**CRITICAL: NOT v4**)
- **CSS Utilities**:
  - `class-variance-authority` - Component variants
  - `clsx` + `tailwind-merge` - Class name merging
  - `tailwindcss-animate` - Animations
- **Icons**: Lucide React
- **Desktop Runtime**: Tauri v2
- **Language**: TypeScript (strict mode)
- **Build Mode**: Static Export (CSR only, NO SSR)
