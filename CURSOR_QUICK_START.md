# Quick Start for Cursor IDE

## Immediate Setup (No Replit Dependencies)

1. **Create `.env` file in root directory:**
```env
DATABASE_URL=sqlite:./dev.db
SESSION_SECRET=your_32_character_random_session_secret_here
NODE_ENV=development
PORT=5000
```

2. **Install dependencies:**
```bash
npm install
npm install sqlite3
```

3. **Update database config for SQLite (simpler than PostgreSQL):**

Create `drizzle.config.simple.ts`:
```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './shared/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './dev.db',
  },
});
```

4. **Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "db:push": "drizzle-kit push --config=drizzle.config.simple.ts",
    "build": "tsc && vite build"
  }
}
```

## Demo Login Credentials
- Email: `admin@cssh.us` Password: `admin123`
- Email: `member@cssh.us` Password: `member123`

## What Works Out of the Box
- ✅ Member authentication with login page
- ✅ All website pages and navigation
- ✅ Contact forms and newsletter signup
- ✅ Event registration for logged-in users
- ✅ Professional medical organization design
- ✅ Responsive mobile-friendly layout

## Key Files Modified for Cursor
- `server/simpleAuth.ts` - Local authentication system
- `client/src/pages/Login.tsx` - Login page
- Updated navigation to use `/login` route
- Session-based authentication (no external dependencies)

## Start Development
```bash
npm run db:push
npm run dev
```

Visit `http://localhost:5000` to see the website.
Login at `http://localhost:5000/login` with demo credentials.