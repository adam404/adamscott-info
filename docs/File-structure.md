---

## `File-structure.md`

```markdown
# File Structure
```

project-root/
├── docs/
├── public/
│ ├── images/
│ └── fonts/
├── src/
│ ├── app/
│ │ ├── about/
│ │ ├── blog/
│ │ ├── contact/
│ │ ├── projects/
│ │ └── page.tsx
│ ├── components/
│ │ ├── common/
│ │ ├── layout/
│ │ └── ui/
│ ├── content/
│ │ ├── blog/
│ │ └── projects/
│ ├── lib/
│ │ ├── utils/
│ │ └── hooks/
│ └── styles/
├── .env
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json

```

## Directory Explanation

### `/docs`
Contains project documentation and guidelines.

### `/public`
Static assets served directly by Next.js.

### `/src/app`
Next.js 14 App Router pages and layouts.

### `/src/components`
Reusable React components.

### `/src/content`
MDX content for blog posts and projects.

### `/src/lib`
Utility functions and custom hooks.

### `/src/styles`
Global styles and Tailwind CSS configuration.

### Configuration Files
- `.env`: Environment variables template
- `.env.local`: Local environment variables
- `next.config.js`: Next.js configuration
- `package.json`: Dependencies and scripts
- `postcss.config.js`: PostCSS configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
```
