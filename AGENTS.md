# Agent Instructions for Portfolio Project

This file contains guidelines and commands for agents working on this codebase.

---

## Project Overview

A React 19 portfolio website with admin dashboard for blog management. Built with Vite, Tailwind CSS, GSAP animations, and localStorage for data persistence.

- **Stack**: React 19, Vite, Tailwind CSS v3, React Router v7, GSAP, Lucide React
- **Theme**: Midnight Luxe (Preset B) - Obsidian/Cream palette
- **Data**: localStorage (dev) → SQLite (production)

---

## Build & Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel
vercel --prod  # Production deployment
```

---

## Code Style Guidelines

### File Organization

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── layout/         # Navbar, Footer, PageTransition
│   ├── sections/       # Home page sections (Hero, Features, etc.)
│   └── ui/             # Reusable UI primitives (Button, Card, etc.)
├── context/            # React Context (AuthContext)
├── hooks/              # Custom hooks
├── pages/
│   ├── admin/          # Admin page components
│   └── *.jsx           # Public pages
├── services/           # Database, API utilities
├── utils/              # Helper functions (cn.js)
└── styles/             # Global CSS
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MagneticButton`, `BlogList` |
| Hooks | camelCase with `use` prefix | `useAuth`, `useScrollProgress` |
| Utilities | camelCase | `cn()`, `generateSlug()` |
| CSS classes | kebab-case | `text-champagne`, `bg-obsidian` |
| Files | PascalCase for components, camelCase for utils | `Navbar.jsx`, `cn.js` |
| Constants | SCREAMING_SNAKE_CASE | `STORAGE_KEYS` |

### Import Order

```jsx
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 3. Framework imports
import { Link, useNavigate } from 'react-router-dom'

// 4. Internal components
import Card from '../ui/Card'
import Badge from '../ui/Badge'

// 5. Internal hooks/utils
import { useAuth } from '../../context/AuthContext'
import db from '../../services/database'

// 6. Assets/images
import './styles.css'
```

### Component Patterns

**Functional Components Only**
```jsx
// ✅ Correct
function Button({ children, variant = 'primary' }) {
  return <button className={`btn btn-${variant}`}>{children}</button>
}

// ❌ Incorrect - No class components
class Button extends Component { ... }
```

**Default Exports for Pages, Named for Components**
```jsx
// ✅ Pages - default export
function BlogList() { ... }
export default BlogList

// ✅ Components - named export
export function cn(...inputs) { ... }

// ✅ Components - default export
const Card = forwardRef(({ children }, ref) => { ... })
export default Card
```

**Props Destructuring**
```jsx
// ✅ Correct - destructured with defaults
function Card({ children, className, hover = false }) {
  return <div className={cn('card', className)}>{children}</div>
}

// ❌ Incorrect - using props directly
function Card(props) {
  return <div className={props.className}>{props.children}</div>
}
```

### State Management

**Local State First**
```jsx
// ✅ Use useState for component-level state
const [isOpen, setIsOpen] = useState(false)

// ✅ Use Context for shared state (auth, theme)
const { user, login, logout } = useAuth()

// ✅ Use custom hooks for reusable logic
const scrollProgress = useScrollProgress()
```

### Error Handling

**Try/Catch with User Feedback**
```jsx
const handleSubmit = async (e) => {
  try {
    setLoading(true)
    await saveData(data)
    setSuccess(true)
  } catch (err) {
    setError(err.message || 'Something went wrong')
    console.error('Save error:', err)
  } finally {
    setLoading(false)
  }
}
```

**Error Boundaries**
```jsx
// Use the ErrorBoundary component for page-level errors
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

---

## GSAP Animation Guidelines

**Always Use gsap.context() with Cleanup**
```jsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || !sectionRef.current) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.element', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

**Default Animation Values**
- Easing: `power3.out` for entrances
- Stagger text: `0.08`, containers: `0.15`
- Duration: `0.6-0.8s` for reveals

---

## Tailwind CSS Guidelines

**Use Design System Colors**
```jsx
// ✅ Design system colors
<div className="bg-obsidian text-ivory border-champagne" />

// ❌ Arbitrary values
<div className="bg-[#0D0D12] text-[#FAF8F5]" />
```

**Component Patterns**
```jsx
// Card with noise texture
<div className="card-base p-8 rounded-[2rem]">

// Magnetic button
<div className="magnetic-btn">
  <span className="btn-bg" />
</div>

// Noise overlay
<div className="noise-overlay" />
```

---

## Database Pattern (localStorage)

**Service Structure**
```javascript
// services/database.js
export const db = {
  blogs: {
    getAll: () => { ... },
    getById: (id) => { ... },
    create: (data) => { ... },
    update: (id, data) => { ... },
    delete: (id) => { ... },
  },
  // Similar pattern for other entities
}
```

---

## Testing Notes

**Manual Testing Checklist**
- [ ] Home page loads with all sections
- [ ] Navigation works (mobile + desktop)
- [ ] Projects page filters correctly
- [ ] Blog CRUD operations work
- [ ] Admin authentication flow works
- [ ] Invite code generation works
- [ ] GSAP animations work
- [ ] Responsive on mobile
- [ ] Reduced motion respected

---

## Adding New Dependencies

```bash
# Install and add to package.json
npm install <package-name>
```

Then verify the package works before committing.

---

## Deployment

**Vercel Configuration**
- `vercel.json` handles SPA routing
- Environment variables: `VITE_GA_MEASUREMENT_ID`
- Run `npm run build` before manual deployment

---

## Important Notes

1. **No class components** - Use functional components only
2. **Respect reduced motion** - Always check `prefers-reduced-motion`
3. **Memory leaks** - Always cleanup GSAP contexts and intervals
4. **No arbitrary CSS values** - Use design system tokens
5. **Accessibility** - Semantic HTML, ARIA labels, keyboard nav
