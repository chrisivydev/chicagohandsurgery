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
    lastName: "User",
  },
  {
    id: "2",
    email: "member@cssh.us",
    password: "member123",
    firstName: "Member",
    lastName: "User",
  },
];

export function setupAuth(app: Express) {
  console.log("=== SETTING UP AUTH ===");

  // Choose session store based on environment
  const USE_IN_MEMORY_STORAGE = process.env.USE_IN_MEMORY_STORAGE === "true" || !process.env.DATABASE_URL || process.env.NODE_ENV === "development";
  console.log("USE_IN_MEMORY_STORAGE:", USE_IN_MEMORY_STORAGE);
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

  let sessionStore;

  try {
    if (USE_IN_MEMORY_STORAGE) {
      // Use in-memory session store for testing
      const MemoryStore = session.MemoryStore;
      sessionStore = new MemoryStore();
      console.log("Using in-memory session store");
    } else {
      // Use PostgreSQL session store for production
      const pgStore = connectPg(session);
      sessionStore = new pgStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: false,
        ttl: 24 * 60 * 60, // 24 hours
        tableName: "sessions",
      });
      console.log("Using PostgreSQL session store");
    }
  } catch (error) {
    console.error("Error setting up session store:", error);
    // Fallback to memory store if there's an error
    const MemoryStore = session.MemoryStore;
    sessionStore = new MemoryStore();
    console.log("Falling back to in-memory session store due to error");
  }

  // Session configuration
  try {
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false, // Set to true in production with HTTPS
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
      })
    );
    console.log("Session middleware configured successfully");
  } catch (error) {
    console.error("Error configuring session middleware:", error);
  }

  console.log("=== AUTH SETUP COMPLETE ===");

  // Initialize demo users
  setTimeout(async () => {
    console.log("Initializing demo users...");
    for (const user of DEMO_USERS) {
      try {
        const existing = await storage.getUser(user.id);
        if (!existing) {
          console.log(`Creating demo user: ${user.email}`);
          await storage.upsertUser({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: null,
          });
          console.log(`Demo user created: ${user.email}`);
        } else {
          console.log(`Demo user already exists: ${user.email}`);
        }
      } catch (error) {
        console.error(`Error initializing user ${user.email}:`, error);
      }
    }
    console.log("Demo user initialization complete");
  }, 1000);

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      console.log("=== LOGIN REQUEST START ===");
      const { email, password } = req.body;

      console.log("Login attempt:", { email, password: password ? "***" : "missing" });

      if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Email and password required" });
      }

      // Find demo user
      const demoUser = DEMO_USERS.find((u) => u.email === email && u.password === password);
      console.log("Demo user found:", demoUser ? "Yes" : "No");

      if (!demoUser) {
        console.log("Invalid credentials");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Get user from database
      console.log("Looking up user in database with ID:", demoUser.id);
      const user = await storage.getUser(demoUser.id);
      console.log("User from database:", user ? "Found" : "Not found");

      if (!user) {
        console.log("User not found in database");
        return res.status(401).json({ message: "User not found" });
      }

      // Set session
      console.log("Setting session for user:", user.id);
      (req.session as any).userId = user.id;
      (req.session as any).user = user;
      console.log("Session set successfully");

      console.log("=== LOGIN REQUEST SUCCESS ===");
      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error("=== LOGIN ERROR ===");
      console.error("Error details:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      res.status(500).json({ message: "Login failed", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
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
