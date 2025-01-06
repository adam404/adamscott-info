# Frontend Guidelines

This document outlines the conventions and best practices for our Next.js + Tailwind CSS frontend.

## 1. Code Style

- **Language**: TypeScript (strict mode).
- **Linting**: ESLint with Prettier for formatting.
- **File Naming**: Use PascalCase for React components (e.g., `Navigation.tsx`).
- **Imports**: Group imports by external, internal, and local with consistent ordering.

## 2. Architecture

- **App Router** (Next.js 13+): Keep each route in its own folder (`about`, `blog`, etc.).
- **Components**: Reusable UI pieces should reside in `src/components/` with domain-specific subfolders if needed.
- **Styles**:
  - Leverage Tailwind classes.
  - Minimal custom CSS in `globals.css` or specialized `.css` files if absolutely necessary.
- **State Management**:
  - For complex global state, consider React Context, Zustand, or Redux.
  - Keep local state in the component where it’s used whenever possible.

## 3. UI/UX & Design

- **Responsive Design**: Use Tailwind’s responsive utilities (e.g., `sm:`, `md:`, `lg:` breakpoints).
- **Animations**: Framer Motion or CSS transitions for subtle interactions.
- **Accessibility**:
  - Properly labeled interactive elements (`aria-label`, `role`, etc.).
  - Keyboard navigable (e.g., focus states).
- **SEO**:
  - Use Next.js `<Head>` or `metadata` for meta tags, titles, etc.

## 4. Performance

- **Images**:
  - Use `<Image />` from Next.js for automatic optimization.
- **Code Splitting**:
  - Dynamic imports for large third-party libraries.
- **Caching**:
  - Rely on Next.js static file caching for images and static assets.
- **Core Web Vitals**:
  - Monitor using Lighthouse or WebPageTest.

## 5. Branching & Pull Requests

- Use feature branches for new features (`feature/xyz`).
- Create PRs and request reviews.
- Resolve lint errors before merging.

## 6. Testing

- **Unit/Integration**: Consider React Testing Library for components.
- **E2E**: Cypress or Playwright for user flow tests if needed.
    