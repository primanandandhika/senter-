# Senter

Senter is an Indonesia-focused energy monitoring prototype for small businesses. It helps owners explore electricity use and estimated costs by device, review usage trends, and see example energy insights.

The app currently uses simulated demo data. It does not connect to live meters or devices, and its tariff is a prototype default rather than a verified current rate.

## Features

- Landing page introducing the product
- Dashboard overview with sample energy use, estimated costs, and device status
- Device list and device detail views
- Usage analytics and history views
- Example insights and recommendations with simulated or preliminary confidence labels
- Settings for the demo business profile and electricity tariff

## Tech stack

- Next.js 16.4.3 with the App Router
- React 19.3
- TypeScript
- Tailwind CSS 4
- Framer Motion, Motion, and GSAP for interface animation

## Requirements

- Node.js 20.9 or newer
- pnpm 12.15.0 (the version recorded in `package.json`)

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The current sample data is local and requires no API credentials.

## Available commands

```bash
pnpm dev     # Start the development server
pnpm build   # Build the production app
pnpm start   # Start the production server after building
pnpm lint    # Run ESLint
```

## App routes

| Route | Page |
| --- | --- |
| `/` | Product landing page |
| `/dashboard` | Energy overview |
| `/dashboard/devices` | Devices and device details |
| `/dashboard/analytics` | Usage analytics |
| `/dashboard/history` | Measurement history |
| `/dashboard/insights` | Example insights and recommendations |
| `/dashboard/settings` | Demo business and tariff settings |

## Project structure

```text
app/                  App Router pages, layouts, styles, and app icons
components/landing/   Landing page sections and visualizations
components/dashboard/ Dashboard views and charts
components/shared/    Shared logo and demo context
lib/                  Energy helpers and simulated demo data
public/               Static assets
types/                Shared TypeScript data types
```

The browser icon is built from the Senter diamond and lightning mark in `app/icon.svg`, with an `.ico` fallback at `app/favicon.ico`.
