# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Spec Kit / SDD Agent Roles

Spec Kit is initialized for this repo. Use `.claude/agents/` for SDD role
definitions and `.claude/skills/` / `.agents/skills/` for the concrete tools.

- `sdd-spec-steward`: spec, clarification, requirements checklist.
- `sdd-repo-planner`: plan, research, data model, contracts, quickstart, tasks.
- `sdd-contract-guardian`: public URL, SEO, AASA, `assetlinks.json`, deep-link
  and API-consumer safety.
- `sdd-implementation-driver`: task execution in this repo.
- `sdd-verification-release`: artifact consistency, validation loop and PR
  readiness.

## Project Overview

Sismos México Web - A Next.js 14 application that displays real-time earthquake data for Mexico. The app fetches seismic data from an external API and presents it through an interactive Google Maps interface with earthquake markers.

## Commands

```bash
# Development
npm run dev       # Start development server at localhost:3000
yarn dev          # Alternative with yarn

# Build & Production
npm run build     # Build for production
npm run start     # Start production server

# Linting
npm run lint      # Run ESLint with Airbnb config
```

## Architecture

### Route Structure (App Router)
- `src/app/layout.tsx` - Root layout with ThemeProvider and Vercel Analytics
- `src/app/(main)/` - Main site routes with NavBar layout (home, earthquakes, legal, about)
- `src/app/join/[code]/` - Circle invitation landing pages (standalone, no navbar)
- `src/app/api/earthquakes/` - API routes that proxy to external data API with secret validation

### Key Patterns

**Server Actions & API Proxy**: The app uses a self-referencing API pattern where:
- Server components call internal API routes via `src/services/earthquakes/earthquakes.service.ts`
- API routes (`src/app/api/`) validate requests with `SELF_SECRET` and proxy to external `DATA_API_URL`
- This pattern protects the external API key while allowing server-side data fetching

**Feature-Based Organization**: `src/features/` contains self-contained features:
- `earthquakes-map/` - Google Maps integration with @vis.gl/react-google-maps
- `navbar/` - Desktop/mobile navigation with responsive components
- `switch-app-theme/` - Dark/light theme toggle using next-themes

**Component Layers**:
- `src/components/ui/` - shadcn/ui primitives (accordion, button, dropdown-menu, table)
- `src/components/widgets/` - Domain widgets (earthquakes-table, ritcher-card, app-download-button)
- `src/components/sections/` - Page sections (hero, download, earthquakes display)
- `src/components/providers/` - React context providers (Theme, EarthquakesData, QueryClient)

### Environment Variables

Required for the app to function:
- `API_URL` - Base URL for self-referencing API calls
- `SELF_SECRET` - Secret key for internal API validation
- `DATA_API_URL` - External earthquake data API URL
- `DATA_API_VERSION` - API version string
- `DATA_API_KEY` - External API authentication key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NEXT_PUBLIC_GOOGLE_MAPS_ID` - Google Maps Map ID

### Styling

- Tailwind CSS with CSS variables for theming (HSL-based color system)
- shadcn/ui component library configured in `components.json`
- Dark mode support via class-based theme switching
- Custom brand colors and Richter scale severity colors defined in `tailwind.config.ts`

### Mobile App Integration

The web app supports deep linking to iOS/Android apps:
- `next.config.js` configures headers for `.well-known/` app association files
- `src/app/join/[code]/` handles circle invitation links that redirect to app stores
