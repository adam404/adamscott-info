---

## `File-structure.md`

```markdown
# File Structure

Below is a simplified overview of the repository layout:

├── Dockerfile
├── k3s.yaml
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── docs/
| ├── App-flow.md
│ ├── Backend-structure.md
│ ├── File-structure.md
│ ├── frontend-guidelines.md
│ ├── PRD.md
│ └── Tech-stack.md
├── public/
│ ├── blog/
│ ├── projects/
│ └── ...
├── src/
│ ├── app/
│ │ ├── about/
│ │ ├── blog/
│ │ ├── contact/
│ │ ├── projects/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── globals.css
│ ├── components/
│ ├── content/
│ │ ├── blog/
│ │ └── projects/
│ ├── data/
│ ├── lib/
│ ├── styles/
│ ├── types/
│ └── utils/
│ ├── signature/
│ │ ├── create/
│ │ ├── verify/
│ │ └── dashboard/
│ ├── components/
│ │ ├── signature/
│ │ │ ├── Canvas.tsx
│ │ │ ├── Upload.tsx
│ │ │ └── AIClone.tsx
│ ├── lib/
│ │ ├── signature/
│ │ │ ├── processing.ts
│ │ │ ├── verification.ts
│ │ │ └── storage.ts
│ │ ├── stripe/
│ │ │ ├── subscriptions.ts
│ │ │ └── webhooks.ts
└── ...

## Key Directories

- **docs/**  
  Contains Markdown documentation (like this file).
- **public/**  
  Holds static assets (images, fonts, etc.) served from `/`.
- **src/app/**  
  Next.js **App Router** directory, hosting route-based folders and page layout structures.
- **src/components/**  
  Shared UI components (e.g., navigation, hero sections, cards).
- **src/content/**  
  Markdown or MDX files for blog posts and project pages.
- **src/styles/**  
  Global or additional CSS if needed beyond Tailwind.
- **Dockerfile**  
  Instructions for building the Docker image.
- **k3s.yaml**  
  K3s or Kubernetes deployment manifest.
```
