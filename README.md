# Chicago Society for Surgery of the Hand Website

A professional website for the Chicago Society for Surgery of the Hand with member authentication and database integration.

## Features

- Member authentication system
- Professional landing page
- Member dashboard
- Event registration
- Contact forms
- Newsletter subscription
- Responsive design with medical organization branding

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (for Replit deployment) or configurable

## Environment Variables

Create a `.env` file in the root directory with:

```env
# Database
DATABASE_URL=your_postgresql_connection_string
PGDATABASE=your_database_name
PGHOST=your_database_host
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGPORT=5432

# Session Secret
SESSION_SECRET=your_long_random_session_secret_key

# For Replit Deployment Only
REPLIT_DOMAINS=your-repl-domain.replit.app
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc

# For Non-Replit Deployment (Optional - see setup instructions)
# AUTH_PROVIDER=local
# JWT_SECRET=your_jwt_secret
```

## Setup Instructions

### For Local Development (Outside Replit)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL database:**
   - Create a PostgreSQL database
   - Update the DATABASE_URL in your .env file

3. **Push database schema:**
   ```bash
   npm run db:push
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### For Replit Deployment

The project is pre-configured for Replit with:
- Automatic database provisioning
- Replit Auth integration
- Environment variables handled automatically

### Alternative Authentication Setup

If deploying outside Replit, you can replace Replit Auth with:

1. **Firebase Auth** - For Google/social login
2. **Auth0** - Enterprise authentication
3. **Local Auth** - Email/password system

Contact the developer for migration assistance.

## Database Schema

The application includes tables for:
- Users (for authentication)
- Contact submissions
- Newsletter subscriptions
- Event registrations
- Session storage

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Push schema changes to database
npm run db:studio    # Open database studio (if available)
```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Database operations
│   └── auth/        # Authentication logic
├── shared/          # Shared types and schemas
└── package.json
```

## Deployment

### Replit (Recommended for this setup)
- Deploy directly from Replit interface
- All environment variables handled automatically

### Other Platforms
1. Update authentication system
2. Configure environment variables
3. Set up PostgreSQL database
4. Deploy using platform-specific instructions

## Support

For questions about setup or customization, please contact the development team.