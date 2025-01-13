# Backend Structure

This document outlines the backend structure of the portfolio website, which primarily uses MDX for content management.

## 1. Content Management

- **Blog Posts**: MDX files in `src/content/blog`
- **Projects**: MDX files in `src/content/projects`
- **Static Assets**: Stored in `public` directory

## 2. API Routes

/api/contact:

- POST /send: Send contact form messages

## 3. Data Storage

- **Content**: MDX files in the repository
- **Assets**: Static files in public directory
- **Contact Messages**: Handled through email service

## 4. Security

- Rate limiting on API endpoints
- Input validation
- CORS configuration
- Environment variables for sensitive data

## 5. Performance

- Static site generation (SSG) for content pages
- Image optimization
- CDN integration
- Caching strategies

## 6. Monitoring

- Vercel Analytics integration
- Error tracking
- Performance monitoring
