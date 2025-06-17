# Setup Guide for Cursor IDE

This guide will help you run the Chicago Society for Surgery of the Hand website in Cursor IDE.

## Quick Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/cssh_db
   PGDATABASE=cssh_db
   PGHOST=localhost
   PGUSER=your_username
   PGPASSWORD=your_password
   PGPORT=5432

   # Session Secret (generate a random 32+ character string)
   SESSION_SECRET=your_very_long_random_session_secret_minimum_32_characters

   # App Configuration
   NODE_ENV=development
   PORT=5000
   ```

3. **Set up PostgreSQL Database**
   
   Install PostgreSQL and create a database:
   ```sql
   CREATE DATABASE cssh_db;
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE cssh_db TO your_username;
   ```

4. **Initialize Database Schema**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Demo Login Credentials

The application includes demo accounts for testing:
- **Admin:** admin@cssh.us / admin123
- **Member:** member@cssh.us / member123

## Key Differences from Replit

- Uses local authentication instead of Replit Auth
- Requires manual PostgreSQL setup
- Environment variables must be manually configured
- Login page available at `/login`

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL connection string
- Check database credentials

### Session Issues
- Ensure SESSION_SECRET is set and at least 32 characters
- Clear browser cookies if experiencing login problems

### Port Conflicts
- Default port is 5000
- Change PORT in .env file if needed

## Production Deployment

For production deployment:
1. Use a cloud PostgreSQL service (AWS RDS, Supabase, etc.)
2. Set NODE_ENV=production
3. Use secure session secrets
4. Configure proper CORS settings
5. Set up SSL/TLS certificates

## File Structure

```
├── client/              # React frontend
├── server/              # Express backend
├── shared/              # Shared schemas and types
├── .env                 # Environment variables (create this)
├── package.json         # Dependencies
└── README.md           # Main documentation
```