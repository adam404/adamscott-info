# Application Flow

This document explains the high-level flow of the Next.js 14 portfolio website.

## Overview

1. **Incoming HTTP Request**

   - A user navigates to adamscott.info
   - The request is handled by Next.js 14's App Router

2. **Page Routing & Rendering**

   - The App Router determines which page component to render based on the URL
   - Pages are organized in the `src/app` directory following Next.js 14 conventions
   - Each route can have its own loading, error, and layout components

3. **Content Management**

   - Content is primarily managed through MDX files in the `src/content` directory
   - Projects, blog posts, and other content are written in MDX format
   - MDX allows for rich content with React components embedded in markdown

4. **Server Components & Data Fetching**

   - Next.js Server Components are used by default for improved performance
   - Content is statically generated at build time where possible
   - Dynamic content fetching occurs server-side when needed

5. **Client Interactions**

   - Interactive components are client-side rendered using React 19
   - Smooth page transitions are handled by Next.js with client-side navigation
   - Framer Motion is used for animations and transitions

6. **Performance & Optimization**
   - Images are automatically optimized using Next.js Image component
   - Static assets are served through the CDN
   - Analytics are tracked using Vercel Analytics
   - TypeScript ensures type safety throughout the application

## Key Features

- MDX-based content management
- Server Components for optimal performance
- Responsive design with Tailwind CSS
- Modern UI components with Headless UI
- Type-safe development with TypeScript
- Beautiful animations with Framer Motion
- Contact form with React Email
- Analytics integration

## System Architecture

```
User Request
    ↓
CDN (Static Assets)
    ↓
Next.js App Router
    ↓
Server Components
    ↙     ↘
Static Content   Dynamic Content
(MDX files)      (API Routes)
    ↘     ↙
Client Hydration
```

This architecture ensures optimal performance, great SEO, and a smooth user experience while maintaining developer productivity and code maintainability.
