# Tech Stack

Here’s a high-level view of the technologies used in our Next.js portfolio project on k3s.

## 1. Core Frameworks & Libraries

- **Next.js**
  - Server-side rendering (SSR) and static site generation (SSG).
  - App Router architecture for route-based structuring.
- **React**
  - UI library powering component-based development.
- **Tailwind CSS**
  - Utility-first CSS framework for rapid UI development.
- **TypeScript**
  - Strongly-typed JavaScript for safer code.

## 2. Kubernetes & Containerization

- **k3s**
  - Lightweight Kubernetes distribution running on AWS Lightsail.
- **Docker**
  - Containerizes the Next.js application for consistency across environments.

## 3. Markdown/WordPress Backend

- **Markdown (MD/MDX)**
  - Simple file-based content management for blog posts, project pages, etc.
- **(Optional) WordPress**
  - REST or GraphQL API for fetching content if a more robust CMS is needed.

## 4. AWS & Infrastructure

- **AWS Lightsail**
  - Simplified VPS hosting for the k3s cluster.
- **Networking & Security**
  - Nginx Ingress Controller for traffic routing.
  - Cert-Manager for TLS/HTTPS certificates.

## 5. CI/CD

- **GitHub Actions**
  - Automates Docker image builds and Kubernetes deployments.
- **Docker Hub** (or ECR)
  - Hosts built container images.

## 6. Monitoring & Logging

- **Prometheus & Grafana**
  - Collects metrics and visualizes system/application performance.
- **EFK Stack** (Elasticsearch, Fluentd, Kibana) or **Fluent-bit**
  - Aggregates logs for centralized viewing.

## 7. Additional Tools

- **ESLint & Prettier**
  - Ensures a consistent, high-quality codebase.
- **Framer Motion**
  - Animation library for smooth UI interactions.
- **Google Analytics 4**
  - Tracks user behavior and site performance.


8. Electronic Signature Components

- **Signature Capture**
  - Canvas API for drawing
  - SignaturePad.js for smooth input
  - TensorFlow.js for signature cloning

- **Document Processing**
  - PDF.js for document handling
  - ImageMagick for watermarking
  - AWS S3 for secure storage

- **Payment Processing**
  - Stripe Elements
  - Stripe Subscription API
  - Webhook handlers

## 9. Security & Compliance

- **Document Security**
  - AES-256 encryption
  - Digital watermarking
  - Audit logging
  - AWS KMS for key management
  - AWS WAF for API protection
  - Rate limiting on signature endpoints
  - Document versioning
  - Multi-region backup strategy

- **Payment Security**
  - PCI DSS compliance
  - Stripe Elements integration
  - 3D Secure authentication