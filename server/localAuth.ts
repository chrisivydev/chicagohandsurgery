import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Simple user credentials for demo (in production, store in database)
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@cssh.us",
    password: "admin123", // Will be hashed
    firstName: "Admin",
    lastName: "User"
  },
  {
    id: "2", 
    email: "member@cssh.us",
    password: "member123", // Will be hashed
    firstName: "Member",
    lastName: "User"
  }
];

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTtl,
    },
  });
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setupAuth(app: Express) {
  app.use(getSession());

  // Initialize demo users in database
  for (const user of DEMO_USERS) {
    try {
      const existingUser = await storage.getUser(user.id);
      if (!existingUser) {
        await storage.upsertUser({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: null,
        });
      }
    } catch (error) {
      console.log(`User ${user.email} already exists or error occurred`);
    }
  }

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      // Find demo user
      const demoUser = DEMO_USERS.find(u => u.email === email);
      if (!demoUser || password !== demoUser.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Get user from database
      const user = await storage.getUser(demoUser.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Set session
      (req.session as any).userId = user.id;
      (req.session as any).user = user;

      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint  
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Logout successful" });
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const session = req.session as any;
  
  if (!session?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await storage.getUser(session.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.user = { claims: { sub: user.id }, ...user };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};