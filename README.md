# maikfigura.de

## Setup

```bash
pnpm install
pnpm run dev
```

## Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Lint code
- `pnpm run format` - Format code with Prettier
- `pnpm run test:e2e` - Run Playwright tests
- `pnpm run validate` - Run all checks (lint, format, type-check)

## Adding Content

1. Create new `.adoc` file in `/content/`
2. Add page name to `navPages` in `/lib/config.js`
3. Content will be automatically available at `/{filename}`

## Navigation

- Update `/lib/config.js` to modify site metadata and navigation
- Responsive navigation with mobile burger menu

## Content Processing

- AsciiDoc files processed with highlight.js for code blocks
- Custom content processing in `/lib/content.js`
