# Issue #1 - Add Terminal-Inspired Design System (Updated for React)

## Overview
Implement a terminal-inspired design system for IniCloud using React components and Tailwind CSS. This will provide consistent styling across all sub-applications while maintaining the terminal aesthetic originally proposed.

## Current Status
✅ Project migrated to React 18 + TypeScript + Tailwind CSS
✅ Basic routing and component structure in place
✅ Dark mode support via Tailwind
⏳ Terminal-inspired design system needed

---

## Design System Architecture (React Version)

### 1. Shared Component Library
Create reusable React components that all sub-apps can use:

**Location:** `src/components/ui/`

**Components to create:**
- `Terminal.tsx` - Terminal window container with header
- `Button.tsx` - Terminal-style buttons (variants: primary, secondary, danger)
- `Card.tsx` - Container cards with terminal styling
- `Badge.tsx` - Status badges (success, warning, error, info)
- `StatusIndicator.tsx` - Animated status dots
- `Navbar.tsx` - Terminal-style navigation bar
- `Input.tsx` - Terminal-style form inputs
- `Checkbox.tsx` - Styled checkbox components

### 2. Theme System with React Context

**File:** `src/contexts/ThemeContext.tsx`

```tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  effectiveTheme: 'light' | 'dark'
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  // Implementation with localStorage persistence
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### 3. Tailwind Configuration Updates

**File:** `tailwind.config.js`

Add terminal-inspired color palette:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: {
            light: '#f8f9fa',
            dark: '#0a0e14',
          },
          text: {
            light: '#2d3748',
            dark: '#e5e9f0',
          },
          accent: {
            cyan: '#00d9ff',
            teal: '#00ffc8',
          },
          success: '#00ff9f',
          warning: '#ffb86c',
          error: '#ff5555',
          info: '#8be9fd',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-cursor': 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
```

### 4. Global Styles

**File:** `src/index.css`

Add terminal-specific base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }

  code, pre {
    @apply font-mono;
  }
}

@layer components {
  .terminal-window {
    @apply bg-terminal-bg-light dark:bg-terminal-bg-dark
           text-terminal-text-light dark:text-terminal-text-dark
           rounded-lg border-2 border-gray-300 dark:border-gray-700
           shadow-xl overflow-hidden;
  }

  .terminal-header {
    @apply bg-gray-200 dark:bg-gray-800
           px-4 py-2 flex items-center gap-2
           border-b-2 border-gray-300 dark:border-gray-700;
  }

  .terminal-dot {
    @apply w-3 h-3 rounded-full;
  }
}

@layer utilities {
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
}
```

---

## Implementation Phases

### Phase 1: Theme System Setup ⏳
- [ ] Create `ThemeContext.tsx` with localStorage persistence
- [ ] Add theme toggle component with icons
- [ ] Update App.tsx to use ThemeProvider
- [ ] Test system preference detection
- [ ] Add theme switcher to Dashboard

### Phase 2: Component Library 📦
- [ ] Create `src/components/ui/` directory structure
- [ ] Build Terminal component with window chrome
- [ ] Build Button component with variants
- [ ] Build Card component
- [ ] Build Badge component with status colors
- [ ] Build StatusIndicator with animations
- [ ] Build Input components
- [ ] Add Storybook or component documentation

### Phase 3: Update Tailwind Config 🎨
- [ ] Add terminal color palette to tailwind.config.js
- [ ] Configure JetBrains Mono font
- [ ] Add custom animations
- [ ] Update base layer styles
- [ ] Add component layer utilities

### Phase 4: Dashboard Redesign 🏠
- [ ] Wrap dashboard in Terminal component
- [ ] Style app cards with terminal aesthetic
- [ ] Add status indicators to apps
- [ ] Implement terminal-style navigation
- [ ] Add theme switcher to header
- [ ] Animate transitions

### Phase 5: Sub-App Integration 🔧
- [ ] Update Checkov with Terminal wrapper
- [ ] Style checkboxes with terminal theme
- [ ] Update WindowSize with terminal styling
- [ ] Ensure all components use theme context
- [ ] Test theme switching across all apps

### Phase 6: Testing & Polish ✨
- [ ] Test all components in light/dark modes
- [ ] Verify theme persistence across sessions
- [ ] Test responsive design on mobile
- [ ] Optimize animations and transitions
- [ ] Add accessibility improvements (ARIA labels, keyboard nav)
- [ ] Update tests for new components
- [ ] Performance audit

---

## Design Specifications

### Color Palette

**Terminal Background:**
- Light: `#f8f9fa` (soft gray-white)
- Dark: `#0a0e14` (deep navy-black)

**Text Colors:**
- Light: `#2d3748` (dark gray)
- Dark: `#e5e9f0` (soft white)

**Accent Colors:**
- Cyan: `#00d9ff` (terminal cyan)
- Teal: `#00ffc8` (terminal green)

**Semantic Colors:**
- Success: `#00ff9f` (bright green)
- Warning: `#ffb86c` (orange)
- Error: `#ff5555` (red)
- Info: `#8be9fd` (light cyan)

### Typography

**Monospace Font Stack:**
1. JetBrains Mono (preferred)
2. Fira Code
3. Consolas
4. monospace (fallback)

**Sans-serif Font Stack:**
1. -apple-system
2. BlinkMacSystemFont
3. Segoe UI
4. sans-serif

### Component Examples

#### Terminal Window Component
```tsx
<Terminal title="Checkov">
  <div className="p-6">
    {/* Content */}
  </div>
</Terminal>
```

#### Button Variants
```tsx
<Button variant="primary">Execute</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Reset</Button>
```

#### Status Badge
```tsx
<Badge status="success">Online</Badge>
<Badge status="warning">Degraded</Badge>
<Badge status="error">Offline</Badge>
```

---

## Technical Requirements

1. **TypeScript** - All components must be fully typed
2. **Accessibility** - WCAG 2.1 AA compliance
3. **Responsive** - Mobile-first, works on all screen sizes
4. **Performance** - Components must be optimized (lazy loading where appropriate)
5. **Testing** - All components must have unit tests
6. **Documentation** - JSDoc comments on all components

---

## Migration from Original Proposal

### Original Approach (HTML/CSS/JS)
- Root-level `/css/` and `/js/` directories
- Sub-apps reference via absolute paths
- Vanilla JS theme switcher class

### React Approach (Current)
- React components in `src/components/ui/`
- Tailwind CSS utility classes
- React Context API for theme management
- Component composition pattern
- TypeScript for type safety

---

## Success Criteria

- [ ] All sub-apps use consistent design system components
- [ ] Theme switcher works across entire app
- [ ] Terminal aesthetic is consistent with original vision
- [ ] All components are responsive and accessible
- [ ] Performance metrics meet standards (Lighthouse score > 90)
- [ ] 100% test coverage for UI components
- [ ] Documentation complete

---

## Notes

- This issue has been updated to reflect the React migration (Issue #3)
- The terminal aesthetic and design vision remain the same
- Implementation uses modern React patterns and Tailwind CSS
- Theme management uses React Context instead of vanilla JS
- Component library approach provides better reusability

---

**Assignee:** @itomek
**Labels:** enhancement, design-system, ui/ux, react
**Related Issues:** #3 (React Migration)
