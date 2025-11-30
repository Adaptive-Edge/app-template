import { db } from "./db";
import { items, type Item, type InsertItem } from "@shared/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: string, item: Partial<InsertItem>): Promise<Item | undefined>;
  deleteItem(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getItems(): Promise<Item[]> {
    return db.select().from(items).orderBy(items.position);
  }

  async getItem(id: string): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = randomUUID();
    await db.insert(items).values({ ...insertItem, id });
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async updateItem(id: string, updates: Partial<InsertItem>): Promise<Item | undefined> {
    await db.update(items).set(updates).where(eq(items.id, id));
    return this.getItem(id);
  }

  async deleteItem(id: string): Promise<boolean> {
    const result = await db.delete(items).where(eq(items.id, id));
    return true;
  }
}

export const storage = new DbStorage();
