# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It uses:
- Next.js 15.3.2 with the App Router
- React 18
- TypeScript
- TailwindCSS 4
- ShadCN UI components
- ESLint 9
- MongoDB with Mongoose for database operations
- Docker for local development environment
- NextAuth.js for authentication
- next-themes for dark mode support

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
  - `providers.tsx` - React context providers (NextAuth, ThemeProvider)
  - `api/auth/[...nextauth]/route.ts` - Next Auth API endpoint
  - `api/auth/register/route.ts` - User registration API endpoint
  - `auth/signin/page.tsx` - Sign in page
  - `auth/register/page.tsx` - Registration page
- `/src/components/` - Reusable React components
  - `Header.tsx` - Main header with navigation
  - `auth/` - Authentication-related components
  - `ui/` - ShadCN UI components
    - Component files like `button.tsx`, `input.tsx`, etc.
    - `mode-toggle.tsx` - Theme switcher component
- `/src/lib/` - Utility functions and configurations
  - `utils.ts` - Utility functions for styling and other operations
  - `db/` - Database connection utilities
    - `mongoose.ts` - MongoDB connection with Mongoose
    - `config.ts` - Database configuration for different environments
  - `auth/` - Authentication utilities
    - `auth.ts` - Client-side authentication hooks and functions
    - `auth-options.ts` - Next Auth configuration
- `/src/models/` - Mongoose models
  - `User.ts` - User model for authentication

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` maps to `./src/*`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `eslint.config.mjs` - ESLint configuration
- `docker-compose.yml` - Docker configuration for local MongoDB
- `components.json` - ShadCN UI configuration
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

## Authentication

The application uses NextAuth.js for authentication with username/password credentials:

### User Model

```typescript
// User model schema in /src/models/User.ts
interface IUser extends Document {
  username: string;
  email: string;
  password: string; // Stored as bcrypt hash
  comparePassword(candidatePassword: string): Promise<boolean>;
}
```

### Client-Side Authentication

```typescript
// In client components
import { useAuth, login, register, logout } from '@/lib/auth/auth';

// Check authentication status
const { isAuthenticated, user, isLoading } = useAuth();

// Login a user
await login(username, password);

// Register a new user
await register(username, email, password);

// Logout
await logout();
```

### Environment Variables

Required environment variables for authentication:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
```

## UI Components

The project uses ShadCN UI, which provides accessible, customizable React components built on top of Radix UI and styled with Tailwind CSS.

### Using ShadCN Components

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example usage
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### Adding New ShadCN Components

To add more ShadCN components to the project:

```bash
npx shadcn@latest add [component-name]

# Examples
npx shadcn@latest add table
npx shadcn@latest add toast
```

### Theme Switching

The application supports theme switching (light/dark/system) using next-themes:

```tsx
import { useTheme } from 'next-themes';

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

## Notes

- The project uses Geist font from Google Fonts (both sans and mono variants)
- TailwindCSS is configured with custom theme variables for light and dark mode
- ShadCN UI components are fully customizable through the source files in `/src/components/ui/`
- The project structure follows Next.js App Router conventions
- For production, set the MONGODB_URI environment variable to your AWS DocumentDB connection string