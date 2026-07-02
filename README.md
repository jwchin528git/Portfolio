# Jia Wen Chin Portfolio

Personal portfolio site for Jia Wen Chin, built with React, TypeScript, and Vite.

The site highlights full-stack and mobile work, with interactive project galleries for:

- School Management Platform
- Business Web Application

## Tech Stack

- React 19
- TypeScript
- Vite
- Oxlint
- CSS custom properties for theming

## Features

- Light and dark theme support
- Animated hero section and skill cards
- Selected work section with screenshot galleries
- Responsive layout for desktop and mobile
- Downloadable resume from `public/Jia-Wen-Chin-Resume.pdf`

## Project Structure

```text
src/
  components/        Reusable page sections and UI pieces
  context/           Theme state and provider
  hooks/             Shared React hooks
assets/
  FSG/               Business Web Application screenshots
  School Management Platform/
                     School Management Platform screenshots
public/
  Jia-Wen-Chin-Resume.pdf
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

## Updating Project Screenshots

Project galleries are configured in:

```text
src/components/Projects.tsx
```

Screenshot files are imported from:

```text
assets/School Management Platform/
assets/FSG/
```

After adding or replacing images, update the relevant image array in `Projects.tsx`, then run:

```bash
npm run build
npm run lint
```

## Notes

Sensitive data in project screenshots should be masked before committing assets.
