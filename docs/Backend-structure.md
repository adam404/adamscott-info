# Backend Structure

Our portfolio site uses Markdown (and optionally WordPress for certain data) as a backend to power blog posts and project content.

## 1. Markdown Files

- **Blog Posts**: Stored as Markdown/MDX in `src/content/blog/`.
- **Project Descriptions**: Stored similarly in `src/content/projects/`.

Each Markdown file typically includes:
```yaml
---
title: "Blog Post Title"
date: "YYYY-MM-DD"
categories: ["Next.js", "Tailwind"]
excerpt: "Short description of this blog post..."
featuredImage: "/blog/my-post-image.png"
---


# Backend Structure

[Previous content remains, adding new section:]

## 2. Electronic Signature Service

### Storage
- **Documents**: Encrypted S3 bucket for document storage
- **Signatures**: Separate encrypted storage for signature data
- **Audit Logs**: Immutable audit trail in separate database

### API Endpoints

/api/signatures:
    POST /create: Create new signature
    POST /clone: AI-powered signature cloning
    GET /verify/{id}: Verify signature authenticity
/api/documents:
    POST /upload: Upload document for signing
    POST /sign: Apply signature to document
    GET /download/{id}: Retrieve signed document

    
