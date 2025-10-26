# My Projects

Welcome to **My Projects** — a personal collection of coding experiments, learning projects, and side builds. This repository showcases what I'm working on as I grow my skills in programming, math, and problem-solving.

## Project Migration to React

This project has been **migrated to React** with TypeScript, Vite, and Tailwind CSS. All sub-projects are now React components with comprehensive test coverage.

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Projects

### Checkov

A simple, lightweight app for creating and managing checklists.

**Features:**
- Dynamically create 1-50 checkboxes
- Persistent state using localStorage
- Reset all checkboxes with confirmation
- Fully responsive design
- Dark mode support

**Route:** `/checkov`

### Browser Size (Window Size)

Real-time browser window dimensions display that updates as you resize.

**Features:**
- Live dimension updates
- Clean, minimal interface
- Dark mode support

**Route:** `/window-size`

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling

### Testing
- **Vitest** - Unit test framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Custom matchers
- **jsdom** - DOM simulation

### Code Quality
- **ESLint** - Linting
- **TypeScript** - Static typing

## Project Structure

```
inicloud/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Main landing page
│   │   ├── Dashboard.test.tsx
│   │   ├── Checkov.tsx         # Checkbox manager app
│   │   ├── Checkov.test.tsx
│   │   ├── WindowSize.tsx      # Window dimensions app
│   │   └── WindowSize.test.tsx
│   ├── test/
│   │   └── setup.ts            # Test configuration
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── old-html-files/             # Original HTML/JS implementations
├── public/                     # Static assets
├── dist/                       # Production build output
├── index.html                  # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Testing

All components have comprehensive test coverage:

- **Dashboard Tests:** Link rendering, navigation, descriptions
- **Checkov Tests:** Checkbox creation, state persistence, reset functionality, input validation
- **WindowSize Tests:** Dimension display, resize handling, cleanup

Run tests with:

```bash
npm test                # Run all tests
npm run test:ui         # Interactive test UI
npm run test:coverage   # Coverage report
```

## Why I Made This

- To keep track of what I've built
- To experiment with modern web development tools (React, TypeScript, Vite)
- To practice component-based architecture and testing
- To apply what I'm learning in school and on my own
- To build a portfolio over time for college or internships

## Features

- Modern React architecture with TypeScript
- Component-based design
- Comprehensive test coverage (18 tests passing)
- Dark mode support across all apps
- Fully responsive design
- Client-side routing
- Production-ready build pipeline

## Contributions

This is mostly a personal repo, but feel free to fork or use any part of it. I'm open to feedback or suggestions if you're browsing through.

## License

This repository is open-source and available under the MIT License.
