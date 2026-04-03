# Portfolio Website

A modern React portfolio with an integrated admin dashboard for blog management. Built with the Midnight Luxe design system featuring cinematic animations and a premium dark aesthetic.

![Portfolio Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80)

---

## Features

### Public Site
- **Hero Section** - Full-bleed hero with parallax scrolling and GSAP animations
- **Services** - Interactive service cards showcasing capabilities
- **Featured Projects** - Filterable project showcase with case studies
- **Blog** - Published articles with category filtering
- **Contact Form** - localStorage-based form with validation
- **Responsive Design** - Mobile-first approach with smooth transitions

### Admin Dashboard
- **Authentication** - Secure login with invite codes
- **Blog Management** - Full CRUD with markdown editor
- **Category System** - Dynamic category creation and management
- **Invite Codes** - Generate single-use codes for team members
- **Activity Log** - Track all content changes
- **User Settings** - Profile and password management

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v7 |
| Animations | GSAP 3 + ScrollTrigger |
| Icons | Lucide React |
| Markdown | react-markdown |
| Storage | localStorage (dev) / SQLite (prod) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### Admin Dashboard

Access the admin dashboard at `/admin/login`:

1. **First user** - Registration is open, creates admin account
2. **Subsequent users** - Require invite code (generate at `/admin/invite-codes`)

---

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── layout/         # Navbar, Footer, PageTransition
│   ├── sections/       # Home page sections
│   └── ui/             # Reusable UI components
├── context/            # React Context (AuthContext)
├── hooks/              # Custom hooks
├── pages/
│   ├── admin/          # Admin pages
│   └── *.jsx           # Public pages
├── services/           # Database service
├── data/               # Static JSON data
├── utils/              # Utility functions
└── styles/             # Global styles
```

---

## Design System

### Colors (Midnight Luxe)

| Token | Hex | Usage |
|-------|-----|-------|
| Obsidian | `#0D0D12` | Primary background |
| Champagne | `#C9A84C` | Accent color |
| Ivory | `#FAF8F5` | Primary text |
| Slate | `#2A2A35` | Secondary surfaces |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono

### Components

- Cards: `rounded-[2rem]` with backdrop blur
- Buttons: Magnetic hover effect with sliding background
- Noise overlay: 5% opacity SVG filter

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` handles SPA routing automatically.

### Environment Variables

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional: Google Analytics
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Data Migration

The database service (`src/services/database.js`) is designed for easy migration:

1. **Current**: localStorage for client-side persistence
2. **Production**: Replace with SQLite or any database

Simply update the methods in `db` object - the interface remains the same.

---

## License

MIT
