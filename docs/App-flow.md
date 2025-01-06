# Application Flow

This document explains the high-level flow of our Next.js application as it runs on a k3s cluster in AWS Lightsail.

## Overview

1. **Incoming HTTP Request**

   - A user navigates to the domain (e.g., `your-domain.com`).
   - The request is routed through the Nginx Ingress Controller on the k3s cluster.

2. **Ingress & Service Routing**

   - The Ingress forwards traffic to the `nextjs-service`, which is a Kubernetes Service of type NodePort (or LoadBalancer).
   - The Service routes traffic to the running Next.js Pods (managed by `nextjs-deployment`).

3. **Next.js SSR & Data Fetching**

   - When a page is requested, Next.js handles server-side rendering (SSR) if required.
   - It fetches any needed content from the Markdown-based backend or any external APIs.
   - Generates the HTML and sends it back through the Ingress to the client’s browser.

4. **Client-Side Hydration**

   - Once the HTML is loaded in the browser, React hydrates the page, enabling interactive components.
   - Subsequent navigations often leverage client-side transitions (using the Next.js router).

5. **Caching & Optimizations**

   - Images are optimized on-the-fly.
   - Static assets (e.g., CSS, JS) can be cached via the CDN or Lightsail settings.
   - Separate signature processing from main application
   - Queue-based processing for large documents
   - Redis caching layer for frequent operations
   - CDN caching for static assets

6. **Logging & Monitoring**
   - Application logs are aggregated (Fluentd/EFK stack or any other solution).
   - Metrics are available via Prometheus & Grafana.

## Electronic Signature Flow

1. **Document Upload**

   - User uploads PDF document
   - System validates format and scans for malware
   - Document is encrypted at rest

2. **Signature Creation**

   - Options presented:
     - Draw signature
     - Upload existing
     - AI clone (premium feature)
   - Preview and adjust signature

3. **Payment & Processing**

   - Verify subscription status
   - Process payment if needed (Stripe)
   - Apply watermark with unique identifier
   - Generate audit trail

4. **Document Delivery**

   - Signed document delivered via secure link
   - Email notifications sent
   - Audit log updated

5. **Future Enhancements**

   - Bulk signature processing
   - Team collaboration features
   - Document templates
   - API access for enterprise customers
   - Multi-language support
   - Mobile-optimized signature capture

## Diagram

User -> Ingress -> nextjs-service -> nextjs-deployment (Pods) (SSL/TLS) (NodePort) (Next.js containers)

This flow ensures scalability (multiple replicas of Next.js Pods), load balancing (via the k3s Service), and simple external access (through Nginx Ingress).

## Updated System Diagram

User -> CloudFront -> API Gateway -> Lambda@Edge
-> S3 (static assets)
-> ECS/k3s (Next.js)
-> Lambda (signature processing)
-> DynamoDB (metadata)
-> S3 (encrypted documents)
