import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Demo users for testing
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@cssh.us",
    password: "admin123",
    firstName: "Admin",
    lastName: "User"
  },
  {
    id: "2", 
    email: "member@cssh.us",
    password: "member123",
    firstName: "Member",
    lastName: "User"
  }
];

export function setupAuth(app: Express) {
  // PostgreSQL session store
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: 24 * 60 * 60, // 24 hours
    tableName: "sessions",
  });

  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Initialize demo users
  setTimeout(async () => {
    for (const user of DEMO_USERS) {
      try {
        const existing = await storage.getUser(user.id);
        if (!existing) {
          await storage.upsertUser({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: null,
          });
        }
      } catch (error) {
        console.log(`User initialization: ${user.email}`);
      }
    }
  }, 1000);

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      // Find demo user
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (!demoUser) {
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