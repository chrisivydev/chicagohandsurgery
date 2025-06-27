import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./simpleAuth";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertEventSchema } from "@shared/schema";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Events endpoints (no authentication required)
  app.get("/api/events", async (req, res) => {
    try {
      const eventsPath = path.join(process.cwd(), "client", "public", "data", "events.json");
      const data = await fs.readFile(eventsPath, "utf8");
      const events = JSON.parse(data);
      res.json(events.events || []);
    } catch (error) {
      console.error("Error reading events:", error);
      res.status(500).json({ message: "Failed to read events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const eventsPath = path.join(process.cwd(), "client", "public", "data", "events.json");

      // Read existing events
      const data = await fs.readFile(eventsPath, "utf8");
      const eventsData = JSON.parse(data);
      const events = eventsData.events || [];

      // Generate new ID
      const nextId = events.length > 0 ? Math.max(...events.map((e: any) => e.id)) + 1 : 1;

      // Add new event
      const newEvent = {
        id: nextId,
        ...validatedData,
      };

      events.push(newEvent);

      // Write back to file
      await fs.writeFile(eventsPath, JSON.stringify({ events }, null, 2));

      res.json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
      console.error("Error adding event:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add event" });
    }
  });

  // Update event in JSON file
  app.put("/api/events/:id", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const validatedData = insertEventSchema.parse(req.body);
      const eventsPath = path.join(process.cwd(), "client", "public", "data", "events.json");

      // Read existing events
      const data = await fs.readFile(eventsPath, "utf8");
      const eventsData = JSON.parse(data);
      const events = eventsData.events || [];

      // Find and update the event
      const eventIndex = events.findIndex((e: any) => e.id === eventId);
      if (eventIndex === -1) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Update the event
      events[eventIndex] = {
        ...events[eventIndex],
        ...validatedData,
        id: eventId, // Ensure ID doesn't change
      };

      // Write back to file
      await fs.writeFile(eventsPath, JSON.stringify({ events }, null, 2));

      res.json({ message: "Event updated successfully", event: events[eventIndex] });
    } catch (error) {
      console.error("Error updating event:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  // Delete event from JSON file
  app.delete("/api/events/:id", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const eventsPath = path.join(process.cwd(), "client", "public", "data", "events.json");

      // Read existing events
      const data = await fs.readFile(eventsPath, "utf8");
      const eventsData = JSON.parse(data);
      const events = eventsData.events || [];

      // Find and remove the event
      const eventIndex = events.findIndex((e: any) => e.id === eventId);
      if (eventIndex === -1) {
        return res.status(404).json({ message: "Event not found" });
      }

      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);

      // Write back to file
      await fs.writeFile(eventsPath, JSON.stringify({ events }, null, 2));

      res.json({ message: "Event deleted successfully", event: deletedEvent });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Auth middleware
  setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
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
  app.post("/api/contact", async (req, res) => {
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
  app.post("/api/newsletter", async (req, res) => {
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
  app.post("/api/events/register", isAuthenticated, async (req: any, res) => {
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
