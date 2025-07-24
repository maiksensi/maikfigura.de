# maikfigura.de

> Personal homepage of Maik Figura - Chaos Engineer at codecentric AG

## 🚀 Modern Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 3.4+ with Typography plugin
- **Content**: AsciiDoc processed with Asciidoctor.js
- **Testing**: Playwright for E2E testing with accessibility checks
- **Deployment**: Vercel with automatic deployments
- **Package Manager**: pnpm (faster installs, better dependency management)

## 📁 Project Structure

```
├── components/          # React components (TypeScript)
├── content/            # AsciiDoc content files
├── e2e/               # Playwright test files
├── lib/               # Utility functions (content processing, config)
├── pages/             # Next.js pages (API routes & pages)
├── static/            # Static assets (images, favicons)
├── styles/            # Global CSS (Tailwind)
└── ...config files
```

## 🛠 Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
pnpm install
pnpm run dev
```

### Commands

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Lint code
- `pnpm run format` - Format code with Prettier
- `pnpm run test:e2e` - Run Playwright tests
- `pnpm run validate` - Run all checks (lint, format, type-check)

### Adding Content

1. Create new `.adoc` file in `/content/`
2. Add page name to `navPages` in `/lib/config.js`
3. Content will be automatically available at `/{filename}`

## 🧪 Testing

- **E2E Tests**: Playwright with cross-browser testing (Chrome, Firefox, Safari)
- **Accessibility**: Built-in a11y testing with @axe-core/playwright
- **Mobile**: Responsive design testing on mobile viewports

```bash
npm run test:e2e          # Run all tests
npm run test:e2e:ui       # Interactive test runner
npm run test:e2e:headed   # Run tests with browser UI
```

## � Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Vercel automatically deploys on push to main branch
3. Uses `npm run build` and exports static site

### Manual Build

```bash
npm run build
# Static files available in ./out/
```

## 🎨 Customization

### Styling

- Modify `/styles/globals.css` for global styles
- Component styles use Tailwind CSS classes
- Typography handled by `@tailwindcss/typography`

### Navigation

- Update `/lib/config.js` to modify site metadata and navigation
- Responsive navigation with mobile burger menu

### Content Processing

- AsciiDoc files processed with highlight.js for code blocks
- Custom content processing in `/lib/content.js`

## 📦 Performance Optimizations

- Static site generation (SSG)
- Turbopack for fast development builds
- Tailwind CSS purging for minimal bundle size
- Next.js Image optimization (disabled for static export)
- TypeScript for better developer experience
