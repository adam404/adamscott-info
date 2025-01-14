# Adam Scott's Portfolio Website

A modern Next.js portfolio website with MDX blog posts and projects showcase. Built with performance and developer experience in mind.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Documentation](#documentation)

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
```

## Deployment

This project is deployed on Vercel. The deployment process is automated through GitHub integration.

### Deployment Process

1. Push to main branch or create a PR
2. Vercel automatically creates preview deployments for PRs
3. Merging to main triggers production deployment

For more details, see [App-flow.md](docs/App-flow.md).

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

For detailed structure information, see [File-structure.md](docs/File-structure.md).

## Features

- **Blog Platform**

  - MDX support
  - Syntax highlighting
  - Rich content embedding

- **Projects Showcase**

  - Portfolio gallery
  - Case studies
  - Live demos

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

For complete technology details, see [Tech-stack.md](docs/Tech-stack.md).

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [Tech Stack](docs/Tech-stack.md) - Complete technology stack details
- [Frontend Guidelines](docs/frontend-guidelines.md) - Code style and best practices
- [File Structure](docs/File-structure.md) - Project organization
- [App Flow](docs/App-flow.md) - Application architecture and flow
- [PRD](docs/PRD.md) - Product requirements and specifications

## License

This project is licensed under the MIT License.
