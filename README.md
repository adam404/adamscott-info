# Adam Scott's Portfolio Website

A modern Next.js portfolio website with MDX blog posts, projects showcase, and electronic signature service.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)

## Prerequisites

- Node.js (Latest LTS version)
- Yarn package manager
- Vercel account
- Environment variables (see below)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/adamscott.info.git
cd adamscott.info
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
yarn dev
```

Visit `http://localhost:3000` to see your application.

## Development

### Commands

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn type-check` - Run TypeScript checks

### Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-key
ELECTRONIC_SIGNATURE_API_KEY=your-api-key
```

## Deployment

This project is deployed on Vercel. The deployment process is automated through GitHub integration.

### Deployment Process

1. Push to main branch or create a PR
2. Vercel automatically creates preview deployments for PRs
3. Merging to main triggers production deployment

### Environment Configuration

1. Add environment variables in Vercel dashboard
2. Configure build settings if needed
3. Set up custom domain if required

## Project Structure

```
project-root/
├── public/          # Static assets
├── src/
│   ├── app/        # Next.js 14 app router pages
│   ├── components/ # React components
│   ├── content/    # MDX content
│   ├── lib/        # Utility functions
│   └── styles/     # Global styles
├── docs/           # Documentation
└── tests/          # Test files
```

## Features

- **Blog Platform**

  - MDX support
  - Syntax highlighting
  - Rich content embedding

- **Projects Showcase**

  - Portfolio gallery
  - Case studies
  - Live demos

- **Electronic Signature Service**

  - Digital signature creation
  - Document handling
  - Subscription tiers

- **Performance**
  - Static Site Generation
  - Image optimization
  - Edge Functions
  - API Routes

## Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Deployment**: Vercel
- **Package Manager**: Yarn
- **Testing**: Jest & Testing Library
- **Analytics**: Vercel Analytics
- **Payment Processing**: Stripe

## License

This project is licensed under the MIT License.
