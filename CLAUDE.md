# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It uses:
- Next.js 15.3.2 with the App Router
- React 19
- TypeScript
- TailwindCSS 4
- ESLint 9
- MongoDB with Mongoose for database operations
- Docker for local development environment

## Common Commands

### Development

```bash
# Start development server with Turbopack (hot module reloading)
npm run dev

# Build the application for production
npm run build

# Start production server
npm run start

# Run ESLint to check for code issues
npm run lint

# Start local MongoDB Docker container
docker-compose up -d

# Stop local MongoDB Docker container
docker-compose down
```

## Project Structure

- `/src/app/` - Main application code using Next.js App Router
  - `layout.tsx` - Root layout component that wraps all pages
  - `page.tsx` - Homepage component
  - `globals.css` - Global CSS styles with Tailwind imports
- `/src/lib/db/` - Database connection utilities
  - `mongoose.ts` - MongoDB connection with Mongoose
  - `config.ts` - Database configuration for different environments

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` maps to `./src/*`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `eslint.config.mjs` - ESLint configuration
- `docker-compose.yml` - Docker configuration for local MongoDB
- `.env.local.example` - Example local environment variables
- `.env.production.example` - Example production environment variables

## Database Configuration

The project is set up with dual database configurations:
- Local development: MongoDB running in Docker
- Production: AWS DocumentDB (MongoDB-compatible)

To connect to the database:
```typescript
import { connectToDatabase } from '@/lib/db/mongoose';

async function someFunction() {
  await connectToDatabase();
  // Your database operations here
}
```

## Notes

- The project uses Geist font from Google Fonts (both sans and mono variants)
- TailwindCSS is configured with custom theme variables for light and dark mode
- The project structure follows Next.js App Router conventions
- For production, set the MONGODB_URI environment variable to your AWS DocumentDB connection string