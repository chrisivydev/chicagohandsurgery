import {
  users,
  contactSubmissions,
  newsletterSubscriptions,
  eventRegistrations,
  events,
  type User,
  type UpsertUser,
  type InsertContactSubmission,
  type InsertNewsletterSubscription,
  type InsertEvent,
  type ContactSubmission,
  type NewsletterSubscription,
  type Event,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Contact form operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;

  // Newsletter operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;

  // Event registration operations
  registerForEvent(userId: string, eventName: string): Promise<void>;

  // Event operations
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(): Promise<Event[]>;
}

// In-memory storage implementation for testing
export class InMemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private contactSubmissions: ContactSubmission[] = [];
  private newsletterSubscriptions: NewsletterSubscription[] = [];
  private eventRegistrations: Array<{ userId: string; eventName: string; registeredAt: Date }> = [];
  private events: Event[] = [
    {
      id: 1,
      title: "Schenck Lectureship",
      description: "Multidisciplinary Management of the Mangled Hand",
      date: "October 16, 2024",
      time: "6:30 PM",
      location: "Capital Grille - 633 N. St Clair St, Chicago IL 60611, Valet Available",
      credits: "2.0 CME Credits",
      month: "OCT",
      day: "16",
      speakerName: "Jeffrey B. Friedrich, MD, MC, FACS",
      speakerTitle: "[ROLE]",
      speakerSpecialty: "[SPECIALTY]",
      speakerImage: "/assets/Home/api-bioimage-jeffrey-friedrich.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "International Guest Virtual Lecture",
      description: "Soft Tissue coverage in Major Upper Limb Trauma",
      date: "December 11, 2024",
      time: "7:30 PM",
      location: "University of Chicago Medicine",
      credits: "1.5 CME Credits",
      month: "DEC",
      day: "11",
      speakerName: "Dr. S Raja Sabapathy",
      speakerTitle: "[ROLE]",
      speakerSpecialty: "[SPECIALTY]",
      speakerImage: "/assets/Home/Raja Sabapathy - International 2024.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Blair Lectureship",
      description: "Wrist Arthroplasty: Why Can't We Catch Up?",
      date: "February 19, 2025",
      time: "6:30 PM",
      location: "Gibson's Steakhouse - 5464 N River Rd, Rosemont, IL",
      credits: "8.0 CME Credits",
      month: "MAY",
      day: "18",
      speakerName: "Harry Hoyen, MD",
      speakerTitle: "[ROLE]",
      speakerSpecialty: "[SPECIALTY]",
      speakerImage: "/assets/Home/Harry_Hoyen_-_Blair.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: "Mason-Stromberg Lectureship",
      description: "Wide Awake Hand Surgery: Why Are We Wasting Time In the Operating Room?",
      date: "April 10, 2025",
      time: "6:30 PM",
      location: "Morton's Steakhouse - 65 E. Wacker Pl, Chicago IL",
      credits: "8.0 CME Credits",
      month: "MAY",
      day: "18",
      speakerName: "Asif Ilyas, MD",
      speakerTitle: "[ROLE]",
      speakerSpecialty: "[SPECIALTY]",
      speakerImage: "/assets/Home/Asif Ilyas.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result: ContactSubmission = {
      id: this.contactSubmissions.length + 1,
      ...submission,
      createdAt: new Date(),
    };
    this.contactSubmissions.push(result);
    return result;
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const existingIndex = this.newsletterSubscriptions.findIndex((s) => s.email === subscription.email);
    const result: NewsletterSubscription = {
      id: existingIndex >= 0 ? this.newsletterSubscriptions[existingIndex].id : this.newsletterSubscriptions.length + 1,
      ...subscription,
      subscribedAt: new Date(),
      isActive: true,
    };

    if (existingIndex >= 0) {
      this.newsletterSubscriptions[existingIndex] = result;
    } else {
      this.newsletterSubscriptions.push(result);
    }

    return result;
  }

  async registerForEvent(userId: string, eventName: string): Promise<void> {
    this.eventRegistrations.push({
      userId,
      eventName,
      registeredAt: new Date(),
    });
  }

  async createEvent(eventData: InsertEvent): Promise<Event> {
    const event: Event = {
      id: this.events.length + 1,
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.events.push(event);
    return event;
  }

  async getEvents(): Promise<Event[]> {
    return this.events;
  }
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Contact form operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }

  // Newsletter operations
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [result] = await db
      .insert(newsletterSubscriptions)
      .values(subscription)
      .onConflictDoUpdate({
        target: newsletterSubscriptions.email,
        set: {
          isActive: true,
          subscribedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  // Event registration operations
  async registerForEvent(userId: string, eventName: string): Promise<void> {
    await db.insert(eventRegistrations).values({
      userId,
      eventName,
    });
  }

  // Event operations
  async createEvent(eventData: InsertEvent): Promise<Event> {
    const [result] = await db.insert(events).values(eventData).returning();
    return result;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.createdAt);
  }
}

// Choose storage implementation based on environment
const USE_IN_MEMORY_STORAGE = process.env.USE_IN_MEMORY_STORAGE === "true" || !process.env.DATABASE_URL || process.env.NODE_ENV === "development";

console.log("=== STORAGE SELECTION ===");
console.log("USE_IN_MEMORY_STORAGE:", USE_IN_MEMORY_STORAGE);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("USE_IN_MEMORY_STORAGE env var:", process.env.USE_IN_MEMORY_STORAGE);
console.log("NODE_ENV:", process.env.NODE_ENV);

export const storage = USE_IN_MEMORY_STORAGE ? new InMemoryStorage() : new DatabaseStorage();

console.log(`Using ${USE_IN_MEMORY_STORAGE ? "In-Memory" : "Database"} storage`);
