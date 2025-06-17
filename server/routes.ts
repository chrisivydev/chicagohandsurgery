import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./simpleAuth";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ message: "Contact form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(400).json({ message: "Failed to submit contact form" });
    }
  });

  // Newsletter subscription
  app.post('/api/newsletter', async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      await storage.createNewsletterSubscription(validatedData);
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(400).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Event registration (protected)
  app.post('/api/events/register', isAuthenticated, async (req: any, res) => {
    try {
      const { eventName } = req.body;
      const userId = req.user.claims.sub;
      
      if (!eventName) {
        return res.status(400).json({ message: "Event name is required" });
      }
      
      await storage.registerForEvent(userId, eventName);
      res.json({ message: "Successfully registered for event" });
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).json({ message: "Failed to register for event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
