# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Testing Commands

- `npm test` - Run tests in watch mode (Vitest)
- `npm run test:run` - Run all tests once
- `npm run test:ui` - Open Vitest UI interface
- `npm run test:coverage` - Run tests with coverage report

## Supabase Setup

This project requires Supabase for backend services. To set up locally:

1. Install Supabase CLI: `npm install supabase --save-dev`
2. Initialize: `npx supabase init`
3. Start local instance: `npx supabase start` (requires Docker)
4. Run `sample-db.sql` in Supabase Studio SQL editor to create the tasks table
5. Enable Realtime on the tasks table in Table Editor

## Environment Variables

Required in `.env`:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Architecture

**Authentication Flow:**
- Uses Supabase Auth with `AuthContext` provider at app root
- `ProtectedRoute` component wraps authenticated routes
- Authentication state managed through `useAuth` hook

**Data Management:**
- React Query (`@tanstack/react-query`) for server state management
- Custom hooks pattern for data operations

**Routing:**
- React Router with routes: `/` (home), `/login`, `/dashboard` (protected)
- Route protection implemented via `ProtectedRoute` component

**Key Dependencies:**
- Vite + React 19 + TypeScript
- Supabase client for backend services
- TailwindCSS v4 for styling
- React Hook Form for form handling
- React Toastify for notifications

## Critical Version-Specific Notes

**React 19 Differences:**
- No need to import React in JSX files (automatic JSX transform)
- Use `useOptimistic` for optimistic updates instead of manual state management
- `useFormStatus` available for form states
- Server Components support (if using Next.js integration)
- Stricter TypeScript types for refs and event handlers

**TailwindCSS v4 Critical Changes:**
- Uses `@tailwindcss/vite` plugin instead of PostCSS plugin
- CSS imports: `@import "tailwindcss";` in `src/index.css` (v4 style)
- Still has `tailwind.config.js` for content paths and customization
- Different installation process: uses Vite plugin architecture
- Class names and utilities remain the same, but build process is different
- Configuration: both Vite plugin AND config file are used together

**Testing Setup:**
- Framework: Vitest + React Testing Library + jsdom
- Configuration: `vite.config.ts` with test globals enabled
- Setup file: `src/test/setup.ts` with Supabase mocks
- Structure: See `TESTING_STRUCTURE.md` for progressive implementation plan

**File Structure:**
- `src/hooks/` - Custom React hooks (currently includes `useAuth` and `useSignOut`)
- `src/context/` - React context providers
- `src/pages/` - Route components
- `src/libs/` - Utility libraries (React Query client)
- `src/test/` - Test setup and utilities
- Path alias `@/` maps to `src/`